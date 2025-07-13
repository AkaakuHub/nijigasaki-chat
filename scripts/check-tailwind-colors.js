#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 禁止されているTailwindの色クラス（globals.cssで定義されたテーマ色を使うべき）
const FORBIDDEN_COLOR_PATTERNS = [
  // Background colors
  /bg-white\b/g,
  /bg-black\b/g,
  /bg-gray-\d+\b/g,
  /bg-slate-\d+\b/g,
  /bg-zinc-\d+\b/g,
  /bg-neutral-\d+\b/g,
  /bg-stone-\d+\b/g,
  
  // Text colors
  /text-white\b/g,
  /text-black\b/g,
  /text-gray-\d+\b/g,
  /text-slate-\d+\b/g,
  /text-zinc-\d+\b/g,
  /text-neutral-\d+\b/g,
  /text-stone-\d+\b/g,
  
  // Border colors
  /border-white\b/g,
  /border-black\b/g,
  /border-gray-\d+\b/g,
  /border-slate-\d+\b/g,
  /border-zinc-\d+\b/g,
  /border-neutral-\d+\b/g,
  /border-stone-\d+\b/g,
  
  // Ring colors
  /ring-blue-\d+\b/g,
  /ring-red-\d+\b/g,
  /ring-green-\d+\b/g,
  /ring-yellow-\d+\b/g,
  /ring-purple-\d+\b/g,
  /ring-pink-\d+\b/g,
  /ring-indigo-\d+\b/g,
  /ring-cyan-\d+\b/g,
  /ring-orange-\d+\b/g,
  
  // Focus colors
  /focus:ring-blue-\d+\b/g,
  /focus:ring-red-\d+\b/g,
  /focus:ring-green-\d+\b/g,
  /focus:ring-yellow-\d+\b/g,
  /focus:ring-purple-\d+\b/g,
  /focus:ring-pink-\d+\b/g,
  /focus:ring-indigo-\d+\b/g,
  /focus:ring-cyan-\d+\b/g,
  /focus:ring-orange-\d+\b/g,
  
  // Button state colors (should use theme colors)
  /hover:bg-blue-\d+\b/g,
  /hover:bg-red-\d+\b/g,
  /hover:bg-green-\d+\b/g,
  /hover:bg-yellow-\d+\b/g,
  /hover:bg-purple-\d+\b/g,
  /hover:bg-pink-\d+\b/g,
  /hover:bg-indigo-\d+\b/g,
  /hover:bg-cyan-\d+\b/g,
  /hover:bg-orange-\d+\b/g,
  
  // Disabled state colors
  /disabled:bg-gray-\d+\b/g,
  /disabled:text-gray-\d+\b/g,
];

// 推奨されるテーマ色の代替案
const COLOR_SUGGESTIONS = {
  'bg-white': 'bg-background または bg-card',
  'bg-gray-50': 'bg-background',
  'bg-gray-100': 'bg-muted',
  'bg-gray-200': 'bg-muted',
  'bg-gray-300': 'bg-border',
  'text-gray-500': 'text-muted-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-700': 'text-foreground',
  'text-gray-800': 'text-foreground',
  'text-gray-900': 'text-foreground',
  'border-gray-200': 'border-border',
  'border-gray-300': 'border-border',
  'bg-blue-500': 'bg-primary',
  'text-blue-500': 'text-primary',
  'hover:bg-blue-600': 'hover:bg-primary/90',
  'focus:ring-blue-500': 'focus:ring-ring',
  'bg-red-500': 'bg-destructive',
  'text-red-500': 'text-destructive',
  'disabled:bg-gray-300': 'disabled:bg-muted',
  'disabled:text-gray-400': 'disabled:text-muted-foreground',
};

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return { hasErrors: false, errors: [] };
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];

  FORBIDDEN_COLOR_PATTERNS.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const line = content.substring(0, match.index).split('\n').length;
      const column = match.index - content.lastIndexOf('\n', match.index - 1);
      const matchedClass = match[0];
      const suggestion = COLOR_SUGGESTIONS[matchedClass] || 'globals.cssで定義されたテーマ色を使用してください';
      
      errors.push({
        line,
        column,
        class: matchedClass,
        suggestion,
        context: getLineContext(content, match.index)
      });
    }
  });

  return {
    hasErrors: errors.length > 0,
    errors
  };
}

function getLineContext(content, index) {
  const lines = content.split('\n');
  const lineNumber = content.substring(0, index).split('\n').length - 1;
  const line = lines[lineNumber];
  return line.trim();
}

function main() {
  const files = process.argv.slice(2);
  
  if (files.length === 0) {
    console.log('📝 Usage: node check-tailwind-colors.js <file1> <file2> ...');
    process.exit(0);
  }

  let totalErrors = 0;
  let hasAnyErrors = false;

  console.log('🎨 Tailwind色定義チェックを開始します...\n');

  files.forEach(file => {
    const result = checkFile(file);
    
    if (result.hasErrors) {
      hasAnyErrors = true;
      console.log(`❌ ${file}:`);
      
      result.errors.forEach(error => {
        totalErrors++;
        console.log(`   Line ${error.line}:${error.column} - ${error.class}`);
        console.log(`   推奨: ${error.suggestion}`);
        console.log(`   Context: ${error.context}`);
        console.log('');
      });
    } else {
      console.log(`✅ ${file}: OK`);
    }
  });

  if (hasAnyErrors) {
    console.log('\n🚫 禁止されたTailwind色クラスが見つかりました!');
    console.log('💡 globals.cssで定義されたテーマ色を使用してください:');
    console.log('   - bg-background, bg-card, bg-primary, bg-secondary, bg-muted');
    console.log('   - text-foreground, text-primary, text-muted-foreground');
    console.log('   - border-border, border-input');
    console.log('   - focus:ring-ring');
    console.log(`\n📊 総エラー数: ${totalErrors}`);
    process.exit(1);
  } else {
    console.log('\n🎉 全てのファイルでテーマ色が正しく使用されています!');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}