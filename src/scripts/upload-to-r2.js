#!/usr/bin/env node

// Script to upload images from /public/images/ to Cloudflare R2
// Run with: node scripts/upload-to-r2.js

const fs = require('fs');
const path = require('path');

// Configuration - Update these with your actual values
const R2_CONFIG = {
  accountId: '84dba3ff5add506e1aa52c53bcca2234',
  bucketName: 'tepaimage',
  // You'll need to set these environment variables or add them here
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
};

// AWS S3 SDK works with R2
const AWS = require('aws-sdk');

// Configure AWS SDK for Cloudflare R2
const s3 = new AWS.S3({
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  accessKeyId: R2_CONFIG.accessKeyId,
  secretAccessKey: R2_CONFIG.secretAccessKey,
  region: 'auto',
  signatureVersion: 'v4',
});

async function uploadFile(filePath, key) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = getContentType(path.extname(filePath));
    
    const params = {
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    };

    const result = await s3.upload(params).promise();
    console.log(`✅ Uploaded: ${key} -> ${result.Location}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to upload ${key}:`, error.message);
    return false;
  }
}

function getContentType(extension) {
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.avif': 'image/avif',
  };
  return types[extension.toLowerCase()] || 'application/octet-stream';
}

async function uploadImagesFromDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    console.error(`❌ Directory not found: ${directoryPath}`);
    return;
  }

  const files = fs.readdirSync(directoryPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.avif'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('No image files found in the directory.');
    return;
  }

  console.log(`Found ${imageFiles.length} image files to upload...`);
  
  let successCount = 0;
  let failureCount = 0;

  for (const file of imageFiles) {
    const filePath = path.join(directoryPath, file);
    const success = await uploadFile(filePath, file);
    
    if (success) {
      successCount++;
    } else {
      failureCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`❌ Failed uploads: ${failureCount}`);
  console.log(`📁 Total files processed: ${imageFiles.length}`);
}

async function checkR2Connection() {
  try {
    await s3.headBucket({ Bucket: R2_CONFIG.bucketName }).promise();
    console.log('✅ R2 connection successful');
    return true;
  } catch (error) {
    console.error('❌ R2 connection failed:', error.message);
    console.log('\n🔧 Setup Instructions:');
    console.log('1. Set environment variables:');
    console.log('   export CLOUDFLARE_R2_ACCESS_KEY_ID="your_access_key"');
    console.log('   export CLOUDFLARE_R2_SECRET_ACCESS_KEY="your_secret_key"');
    console.log('2. Or add them directly to this script');
    console.log('3. Make sure your R2 bucket exists and has the correct permissions');
    return false;
  }
}

async function main() {
  console.log('🚀 Cloudflare R2 Image Upload Script');
  console.log('=====================================\n');

  // Check if credentials are available
  if (!R2_CONFIG.accessKeyId || !R2_CONFIG.secretAccessKey) {
    console.error('❌ Missing R2 credentials!');
    console.log('Please set CLOUDFLARE_R2_ACCESS_KEY_ID and CLOUDFLARE_R2_SECRET_ACCESS_KEY environment variables');
    process.exit(1);
  }

  // Test R2 connection
  const connected = await checkR2Connection();
  if (!connected) {
    process.exit(1);
  }

  // Upload images from public/images directory
  const imagesPath = path.join(__dirname, '..', 'public', 'images');
  await uploadImagesFromDirectory(imagesPath);

  console.log('\n🎉 Upload process completed!');
  console.log('\n📝 Next Steps:');
  console.log('1. Update your Cloudflare Worker URL in /utils/r2-images.ts');
  console.log('2. Deploy your Cloudflare Worker');
  console.log('3. Test the R2Image component in your application');
}

// Handle command line execution
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  });
}

module.exports = {
  uploadFile,
  uploadImagesFromDirectory,
  checkR2Connection,
};