#!/usr/bin/env node

// Migration script to help transition from LocalImage to R2Image
// This script will scan your codebase and provide a migration guide

const fs = require('fs');
const path = require('path');

const componentDirs = ['components', 'pages'];
const extensions = ['.tsx', '.ts', '.jsx', '.js'];

function findFilesWithPattern(dir, pattern) {
  const results = [];
  
  if (!fs.existsSync(dir)) {
    return results;
  }

  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...findFilesWithPattern(filePath, pattern));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (pattern.test(content)) {
        results.push({
          file: filePath,
          content
        });
      }
    }
  }
  
  return results;
}

function analyzeLocalImageUsage() {
  console.log('🔍 Scanning for LocalImage usage...\n');
  
  const localImagePattern = /LocalImage|getLocalImagePath|getLocalImage/g;
  const directImagePattern = /src=["']\/images\/[^"']+["']/g;
  
  let foundFiles = [];
  
  for (const dir of componentDirs) {
    foundFiles.push(...findFilesWithPattern(dir, localImagePattern));
    foundFiles.push(...findFilesWithPattern(dir, directImagePattern));
  }

  if (foundFiles.length === 0) {
    console.log('✅ No LocalImage usage found. You\'re ready to use R2Image!');
    return;
  }

  console.log(`📁 Found ${foundFiles.length} files with local image usage:\n`);
  
  foundFiles.forEach(({ file, content }) => {
    console.log(`📄 ${file}`);
    
    // Find LocalImage imports
    const localImageImports = content.match(/import.*LocalImage.*from.*['"]/g);
    if (localImageImports) {
      console.log('  🔄 Replace import:');
      console.log(`    - ${localImageImports[0]}`);
      console.log(`    + import { R2Image } from './R2Image';`);
    }
    
    // Find LocalImage component usage
    const localImageUsage = content.match(/<LocalImage[^>]*>/g);
    if (localImageUsage) {
      console.log('  🔄 Replace component usage:');
      localImageUsage.forEach(usage => {
        console.log(`    - ${usage}`);
        console.log(`    + ${usage.replace('LocalImage', 'R2Image')}`);
      });
    }
    
    // Find direct image paths
    const directImages = content.match(/src=["']\/images\/[^"']+["']/g);
    if (directImages) {
      console.log('  🔄 Replace direct image paths:');
      directImages.forEach(imagePath => {
        console.log(`    - ${imagePath}`);
        console.log(`    + Use R2Image component instead`);
      });
    }
    
    console.log('');
  });
  
  console.log('📋 Migration Checklist:');
  console.log('  1. ✅ Upload images to R2 using: npm run upload-to-r2');
  console.log('  2. ✅ Deploy Cloudflare Worker using: npm run deploy-worker');
  console.log('  3. ✅ Update worker URL in /utils/r2-images.ts');
  console.log('  4. 🔄 Replace LocalImage imports with R2Image');
  console.log('  5. 🔄 Replace LocalImage components with R2Image');
  console.log('  6. 🔄 Replace direct image paths with R2Image components');
  console.log('  7. ✅ Test your application');
  console.log('  8. ✅ Remove old LocalImage files if no longer needed');
}

function generateR2Config() {
  console.log('\n🔧 Generating R2 configuration...\n');
  
  const config = `
// R2 Configuration for Tepa Solutions
// Update these values with your actual Cloudflare Worker URL

export const R2_WORKER_URL = 'https://tepa-r2-image-server.your-subdomain.workers.dev';

// Update this in /utils/r2-images.ts:
// Replace: WORKER_URL: 'https://your-worker-name.your-subdomain.workers.dev'
// With:    WORKER_URL: '${R2_WORKER_URL}'
`;

  console.log(config);
}

function checkR2Setup() {
  console.log('🏥 Checking R2 setup...\n');
  
  const checks = [
    {
      name: 'R2 Images Utility',
      file: 'utils/r2-images.ts',
      status: fs.existsSync('utils/r2-images.ts') ? '✅' : '❌'
    },
    {
      name: 'R2Image Component',
      file: 'components/R2Image.tsx',
      status: fs.existsSync('components/R2Image.tsx') ? '✅' : '❌'
    },
    {
      name: 'Cloudflare Worker',
      file: 'supabase/functions/r2-image-server/index.ts',
      status: fs.existsSync('supabase/functions/r2-image-server/index.ts') ? '✅' : '❌'
    },
    {
      name: 'Wrangler Config',
      file: 'wrangler.toml',
      status: fs.existsSync('wrangler.toml') ? '✅' : '❌'
    },
    {
      name: 'Upload Script',
      file: 'scripts/upload-to-r2.js',
      status: fs.existsSync('scripts/upload-to-r2.js') ? '✅' : '❌'
    }
  ];
  
  checks.forEach(check => {
    console.log(`${check.status} ${check.name} (${check.file})`);
  });
  
  const allReady = checks.every(check => check.status === '✅');
  
  if (allReady) {
    console.log('\n🎉 All R2 components are ready!');
  } else {
    console.log('\n⚠️  Some R2 components are missing. Please run the setup again.');
  }
}

function main() {
  console.log('🚀 R2 Migration Assistant for Tepa Solutions');
  console.log('===========================================\n');
  
  const command = process.argv[2];
  
  switch (command) {
    case 'analyze':
    case 'scan':
      analyzeLocalImageUsage();
      break;
    case 'config':
      generateR2Config();
      break;
    case 'check':
      checkR2Setup();
      break;
    default:
      console.log('📚 Available commands:');
      console.log('  node scripts/migrate-to-r2.js analyze  - Scan for LocalImage usage');
      console.log('  node scripts/migrate-to-r2.js config   - Generate R2 configuration');
      console.log('  node scripts/migrate-to-r2.js check    - Check R2 setup status');
      console.log('');
      
      // Run all checks by default
      checkR2Setup();
      console.log('');
      analyzeLocalImageUsage();
      generateR2Config();
  }
}

if (require.main === module) {
  main();
}