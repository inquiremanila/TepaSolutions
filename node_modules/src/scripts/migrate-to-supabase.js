#!/usr/bin/env node

// Migration script to help transition from LocalImage to SupabaseImage
// Run with: node scripts/migrate-to-supabase.js

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
    console.log('✅ No LocalImage usage found. You\'re ready to use SupabaseImage!');
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
      console.log(`    + import { SupabaseImage } from './SupabaseImage';`);
    }
    
    // Find LocalImage component usage
    const localImageUsage = content.match(/<LocalImage[^>]*>/g);
    if (localImageUsage) {
      console.log('  🔄 Replace component usage:');
      localImageUsage.forEach(usage => {
        console.log(`    - ${usage}`);
        console.log(`    + ${usage.replace('LocalImage', 'SupabaseImage')}`);
      });
    }
    
    // Find direct image paths
    const directImages = content.match(/src=["']\/images\/[^"']+["']/g);
    if (directImages) {
      console.log('  🔄 Replace direct image paths:');
      directImages.forEach(imagePath => {
        console.log(`    - ${imagePath}`);
        console.log(`    + Use SupabaseImage component instead`);
      });
    }
    
    console.log('');
  });
  
  console.log('📋 Migration Checklist:');
  console.log('  1. ✅ Set up Supabase project and enable Storage');
  console.log('  2. ✅ Create "tepa-images" bucket in Supabase Storage');
  console.log('  3. ✅ Configure environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)');
  console.log('  4. ✅ Upload images using: npm run upload-to-supabase');
  console.log('  5. 🔄 Replace LocalImage imports with SupabaseImage');
  console.log('  6. 🔄 Replace LocalImage components with SupabaseImage');
  console.log('  7. 🔄 Replace direct image paths with SupabaseImage components');
  console.log('  8. ✅ Test your application');
  console.log('  9. ✅ Remove old LocalImage files');
}

function generateSupabaseConfig() {
  console.log('\n🔧 Generating Supabase configuration...\n');
  
  const config = `
// Supabase Configuration for Tepa Solutions
// Create a .env file in your project root with these variables:

VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

// Steps to get these values:
// 1. Go to https://supabase.com/dashboard
// 2. Create a new project or select existing one
// 3. Go to Settings > API
// 4. Copy the Project URL and anon public key
// 5. Go to Storage and create a bucket named "tepa-images"
// 6. Set the bucket to public if you want direct access

// Example .env file:
// VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
// VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
`;

  console.log(config);
}

function checkSupabaseSetup() {
  console.log('🏥 Checking Supabase setup...\n');
  
  const checks = [
    {
      name: 'Supabase Images Utility',
      file: 'utils/supabase-images.ts',
      status: fs.existsSync('utils/supabase-images.ts') ? '✅' : '❌'
    },
    {
      name: 'SupabaseImage Component',
      file: 'components/SupabaseImage.tsx',
      status: fs.existsSync('components/SupabaseImage.tsx') ? '✅' : '❌'
    },
    {
      name: 'Environment Variables',
      file: '.env or .env.local',
      status: (fs.existsSync('.env') || fs.existsSync('.env.local')) ? '✅' : '❌'
    },
    {
      name: 'Supabase Dependency',
      file: 'package.json',
      status: (() => {
        try {
          const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
          return pkg.dependencies['@supabase/supabase-js'] ? '✅' : '❌';
        } catch {
          return '❌';
        }
      })()
    }
  ];
  
  checks.forEach(check => {
    console.log(`${check.status} ${check.name} (${check.file})`);
  });
  
  const allReady = checks.every(check => check.status === '✅');
  
  if (allReady) {
    console.log('\n🎉 All Supabase components are ready!');
  } else {
    console.log('\n⚠️  Some Supabase components are missing. Please run the setup again.');
  }
}

function generateUploadScript() {
  console.log('\n📤 Generating upload script...\n');
  
  const script = `
// Upload script for migrating local images to Supabase
// Save this as upload-images.js and run with: node upload-images.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Use service role key for uploads
const bucketName = 'tepa-images';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadImage(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: 'image/png', // Adjust based on file type
        cacheControl: '31536000', // 1 year cache
        upsert: false
      });

    if (error) {
      console.error(\`❌ Failed to upload \${fileName}:\`, error.message);
      return false;
    }

    console.log(\`✅ Uploaded: \${fileName}\`);
    return true;
  } catch (error) {
    console.error(\`❌ Error uploading \${fileName}:\`, error.message);
    return false;
  }
}

async function main() {
  const imagesDir = 'public/images';
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(file => /\\.(png|jpg|jpeg|gif|webp)$/i.test(file));

  console.log(\`📸 Found \${imageFiles.length} images to upload...\`);

  for (const file of imageFiles) {
    const filePath = path.join(imagesDir, file);
    await uploadImage(filePath, file);
  }

  console.log('🎉 Upload completed!');
}

main().catch(console.error);
`;

  console.log(script);
}

function main() {
  console.log('🚀 Supabase Migration Assistant for Tepa Solutions');
  console.log('===============================================\n');
  
  const command = process.argv[2];
  
  switch (command) {
    case 'analyze':
    case 'scan':
      analyzeLocalImageUsage();
      break;
    case 'config':
      generateSupabaseConfig();
      break;
    case 'check':
      checkSupabaseSetup();
      break;
    case 'upload-script':
      generateUploadScript();
      break;
    default:
      console.log('📚 Available commands:');
      console.log('  node scripts/migrate-to-supabase.js analyze       - Scan for LocalImage usage');
      console.log('  node scripts/migrate-to-supabase.js config        - Generate Supabase configuration');
      console.log('  node scripts/migrate-to-supabase.js check         - Check Supabase setup status');
      console.log('  node scripts/migrate-to-supabase.js upload-script - Generate upload script');
      console.log('');
      
      // Run all checks by default
      checkSupabaseSetup();
      console.log('');
      analyzeLocalImageUsage();
      generateSupabaseConfig();
  }
}

if (require.main === module) {
  main();
}