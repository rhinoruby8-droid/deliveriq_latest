const fs = require('fs');

let text = fs.readFileSync('eslint_report.json', 'utf8');
const lines = text.split('\n');
const jsonLines = lines.filter(l => !l.startsWith('npm warn') && !l.includes('RemoteException') && !l.includes('CategoryInfo') && !l.includes('At line:'));
const cleanText = jsonLines.join('\n').trim();
const start = cleanText.indexOf('[');
const end = cleanText.lastIndexOf(']');
const data = JSON.parse(cleanText.substring(start, end + 1));

// Get react-refresh violations
console.log('=== react-refresh/only-export-components violations ===');
data.forEach(file => {
  (file.messages || []).forEach(msg => {
    if (msg.ruleId === 'react-refresh/only-export-components') {
      const shortPath = file.filePath.replace(/^.*[\\\/]DeliverIQ[\\\/]/, '');
      console.log(`FILE: ${shortPath} | Line ${msg.line}: ${msg.message}`);
    }
  });
});

// Get no-useless-escape violations  
console.log('\n=== no-useless-escape violations ===');
data.forEach(file => {
  (file.messages || []).forEach(msg => {
    if (msg.ruleId === 'no-useless-escape') {
      const shortPath = file.filePath.replace(/^.*[\\\/]DeliverIQ[\\\/]/, '');
      console.log(`FILE: ${shortPath} | Line ${msg.line}:${msg.column}: ${msg.message}`);
    }
  });
});

// Get no-explicit-any violations
console.log('\n=== @typescript-eslint/no-explicit-any violations ===');
data.forEach(file => {
  (file.messages || []).forEach(msg => {
    if (msg.ruleId === '@typescript-eslint/no-explicit-any') {
      const shortPath = file.filePath.replace(/^.*[\\\/]DeliverIQ[\\\/]/, '');
      console.log(`FILE: ${shortPath} | Line ${msg.line}:${msg.column}: ${msg.message}`);
    }
  });
});
