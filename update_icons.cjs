const fs = require('fs');
const path = require('path');

const emojiMap = {
  '🏆': '<Trophy size={18} />',
  '🎯': '<Target size={18} />',
  '⚔️': '<Swords size={18} />',
  '👑': '<Crown size={18} />',
  '🤝': '<Handshake size={18} />',
  '🔥': '<Flame size={18} />',
  '🥈': '<Medal size={18} />',
  '🏅': '<Award size={18} />',
  '🔫': '<Crosshair size={18} />',
  '💥': '<Zap size={18} />',
  '🚀': '<Rocket size={18} />',
  '🌪️': '<Wind size={18} />',
  '⛏️': '<Pickaxe size={18} />',
  '🎮': '<Gamepad2 size={18} />',
  '🎉': '<PartyPopper size={18} />',
  '💻': '<Laptop size={18} />',
  '⭐': '<Star size={18} />',
  '👁️': '<Eye size={18} />',
  '📋': '<ClipboardList size={18} />',
  '📅': '<Calendar size={18} />',
  '👤': '<User size={18} />',
  '❤️': '<Heart size={18} />',
  '👥': '<Users size={18} />',
  '🌆': '<Building size={18} />',
  '🎖️': '<Medal size={18} />',
  '🪖': '<Shield size={18} />',
  '📝': '<PenSquare size={18} />',
  '📢': '<Megaphone size={18} />',
  '📹': '<Video size={18} />',
  '🟢': '<CircleDot size={18} />',
  '⚡': '<Zap size={18} />',
  '💬': '<MessageSquare size={18} />',
  '🛡️': '<Shield size={18} />'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      let usedIcons = new Set();
      
      for (const [emoji, replacement] of Object.entries(emojiMap)) {
        if (content.includes("'" + emoji + "'")) {
          content = content.replace(new RegExp("'" + emoji + "'", 'g'), replacement);
          usedIcons.add(replacement.match(/<([A-Za-z]+)/)[1]);
          changed = true;
        }
        if (content.includes('\`' + emoji + '\`')) {
          content = content.replace(new RegExp('\`' + emoji + '\`', 'g'), replacement);
          usedIcons.add(replacement.match(/<([A-Za-z]+)/)[1]);
          changed = true;
        }
      }
      
      if (changed) {
         if (!content.includes('lucide-react')) {
            content = "import React from 'react';\nimport { " + [...usedIcons].join(', ') + " } from 'lucide-react';\n" + content;
         } else {
            content = "import { " + [...usedIcons].join(', ') + " } from 'lucide-react';\n" + content;
         }
         fs.writeFileSync(fullPath, content, 'utf8');
         console.log('Updated: ' + fullPath);
      }
    }
  }
}

processDir('./src');
console.log('Done');
