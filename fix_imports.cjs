const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];?/g;
      let match;
      let allIcons = new Set();
      let hasLucide = false;
      
      while ((match = importRegex.exec(content)) !== null) {
        hasLucide = true;
        const icons = match[1].split(',').map(s => s.trim()).filter(Boolean);
        icons.forEach(i => allIcons.add(i));
      }
      
      if (hasLucide) {
        // Remove all old lucide imports
        content = content.replace(/import\s+\{[^}]+\}\s+from\s+['"]lucide-react['"];?\n?/g, '');
        // Add single combined import at top
        const combinedImport = `import { ${[...allIcons].join(', ')} } from 'lucide-react';\n`;
        // Insert after the first comment block if any, or just at the top
        content = combinedImport + content;
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDir('./src');
console.log('Fixed imports');
