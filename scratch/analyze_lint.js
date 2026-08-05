const fs = require('fs');
const path = require('path');

const reportPath = fs.existsSync('./scratch/lint_report.json') ? './scratch/lint_report.json' : './eslint_report.json';
const text = fs.readFileSync(reportPath, 'utf8');

const start = text.indexOf('[');
const end = text.lastIndexOf(']');

if (start !== -1 && end !== -1) {
  const jsonStr = text.substring(start, end + 1);
  const data = JSON.parse(jsonStr);

  const ruleCounts = {};
  let totalErrors = 0;
  let totalWarnings = 0;
  const fileErrors = {};
  const fileWarnings = {};

  data.forEach(file => {
    const relPath = path.relative('.', file.filePath);
    let errC = 0;
    let warnC = 0;
    (file.messages || []).forEach(msg => {
      const rule = msg.ruleId || 'syntax/other';
      if (!ruleCounts[rule]) {
        ruleCounts[rule] = { error: 0, warning: 0, sampleMsg: msg.message };
      }
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
    if (errC > 0) fileErrors[relPath] = errC;
    if (warnC > 0) fileWarnings[relPath] = warnC;
  });

  console.log(`Total Errors: ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log('\n--- BREAKDOWN BY RULE ---');
  Object.entries(ruleCounts)
    .sort((a, b) => (b[1].error + b[1].warning) - (a[1].error + a[1].warning))
    .forEach(([rule, counts]) => {
      console.log(`Rule: ${rule.padEnd(42)} | Errors: ${String(counts.error).padEnd(5)} | Warnings: ${String(counts.warning).padEnd(5)} | Sample: ${counts.sampleMsg.substring(0, 60)}`);
    });

  console.log('\n--- TOP FILES WITH ERRORS ---');
  Object.entries(fileErrors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .forEach(([f, c]) => console.log(`${f}: ${c} errors`));
} else {
  console.log('Could not locate JSON array in report.');
}
