import json
import os

path = 'scratch/lint_report.json' if os.path.exists('scratch/lint_report.json') else 'eslint_report.json'

with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# find first '[' and last ']'
start = text.find('[')
end = text.rfind(']')

if start != -1 and end != -1:
    json_str = text[start:end+1]
    data = json.loads(json_str)

    rule_counts = {}
    total_errors = 0
    total_warnings = 0
    file_errors = {}
    file_warnings = {}

    for file in data:
        rel_path = os.path.relpath(file['filePath'], '.')
        err_c = 0
        warn_c = 0
        for msg in file.get('messages', []):
            rule = msg.get('ruleId') or 'syntax/other'
            if rule not in rule_counts:
                rule_counts[rule] = {'error': 0, 'warning': 0, 'sample_msg': msg.get('message', '')}
            
            if msg.get('severity') == 2:
                rule_counts[rule]['error'] += 1
                total_errors += 1
                err_c += 1
            else:
                rule_counts[rule]['warning'] += 1
                total_warnings += 1
                warn_c += 1
        if err_c > 0:
            file_errors[rel_path] = err_c
        if warn_c > 0:
            file_warnings[rel_path] = warn_c

    print(f"Total Errors: {total_errors}")
    print(f"Total Warnings: {total_warnings}")
    print("\n--- BREAKDOWN BY RULE ---")
    for r, c in sorted(rule_counts.items(), key=lambda x: x[1]['error'] + x[1]['warning'], reverse=True):
        print(f"Rule: {r:<40} | Errors: {c['error']:<5} | Warnings: {c['warning']:<5} | Sample: {c['sample_msg'][:60]}")

    print("\n--- TOP FILES WITH ERRORS ---")
    for f, c in sorted(file_errors.items(), key=lambda x: x[1], reverse=True)[:15]:
        print(f"{f}: {c} errors")
else:
    print("Could not locate JSON array in report.")
