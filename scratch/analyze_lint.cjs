const fs = require('fs');

let text = fs.readFileSync('eslint_report.json', 'utf8');

// Filter lines that don't start with [{ or whitespace/brackets
const lines = text.split('\n');
const jsonLines = lines.filter(l => !l.startsWith('npm warn') && !l.includes('RemoteException') && !l.includes('CategoryInfo') && !l.includes('At line:'));
const cleanText = jsonLines.join('\n').trim();

// Find array start '[' and end ']'
const start = cleanText.indexOf('[');
const end = cleanText.lastIndexOf(']');

if (start !== -1 && end !== -1) {
  const jsonStr = cleanText.substring(start, end + 1);
  try {
    const data = JSON.parse(jsonStr);

    const ruleCounts = {};
    let totalErrors = 0;
    let totalWarnings = 0;
    const fileSummary = {};

    data.forEach(file => {
      let errC = 0;
      let warnC = 0;
      const shortPath = file.filePath.replace(/^.*[\\\/]DeliverIQ_2[\\\/]/, '').replace(/^.*[\\\/]DeliverIQ[\\\/]/, '');
      (file.messages || []).forEach(msg => {
        const rule = msg.ruleId || 'syntax/other';
        if (!ruleCounts[rule]) {
          ruleCounts[rule] = { error: 0, warning: 0, sampleMsg: msg.message, files: new Set() };
        }
        ruleCounts[rule].files.add(shortPath);
        if (msg.severity === 2) {
          ruleCounts[rule].error++;
          totalErrors++;
          errC++;
        } else {
          ruleCounts[rule].warning++;
          totalWarnings++;
          warnC++;
        }
      });
      if (errC > 0 || warnC > 0) {
        fileSummary[shortPath] = { errors: errC, warnings: warnC };
      }
    });

    console.log(`TOTAL_ERRORS: ${totalErrors}`);
    console.log(`TOTAL_WARNINGS: ${totalWarnings}\n`);
    console.log('--- RULES SUMMARY ---');
    Object.entries(ruleCounts)
      .sort((a, b) => (b[1].error * 10 + b[1].warning) - (a[1].error * 10 + a[1].warning))
      .forEach(([rule, counts]) => {
        console.log(`RULE: ${rule}`);
        console.log(`ERRORS: ${counts.error} | WARNINGS: ${counts.warning} | AFFECTED_FILES: ${counts.files.size}`);
        console.log(`SAMPLE: ${counts.sampleMsg}`);
        console.log('---');
      });

    console.log('\n--- TOP FILES ---');
    Object.entries(fileSummary)
      .sort((a, b) => (b[1].errors * 10 + b[1].warnings) - (a[1].errors * 10 + a[1].warnings))
      .slice(0, 25)
      .forEach(([f, c]) => console.log(`${f}: ${c.errors} errors, ${c.warnings} warnings`));
  } catch (e) {
    console.error("JSON parse error:", e.message);
  }
}
