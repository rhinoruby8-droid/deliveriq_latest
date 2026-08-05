const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/pages/**/*.tsx');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace `const { site, title, description } = useSeoMetadata(...)` with `useSeoMetadata(...)`
  content = content.replace(/const\s+\{\s*site,\s*title,\s*description\s*\}\s*=\s*useSeoMetadata\((.*?)\);/g, "useSeoMetadata($1);");
  
  // Remove unused Helmet imports
  content = content.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?\n?/g, "");
  
  fs.writeFileSync(file, content);
});

console.log('Fixed unused variables in pages');
