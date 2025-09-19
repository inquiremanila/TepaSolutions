#!/usr/bin/env node

// Script to upload images from /public/images/ to Supabase Storage
// Run with: node scripts/upload-to-supabase.js
require('dotenv').config();


const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnvFile() {
  const envFiles = ['.env.local', '.env'];
  
  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      const envContent = fs.readFileSync(envFile, 'utf8');
      const envVars = {};
      
      envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim();
          }
        }
      });
      
      // Set environment variables
      Object.assign(process.env, envVars);
      console.log(`📄 Loaded environment variables from ${envFile}`);
      return true;
    }
  }
  
  return false;
}

// Load environment variables
loadEnvFile();

// Configuration
const SUPABASE_CONFIG = {
  url: process.env.VITE_SUPABASE_URL,
  serviceKey: process.env.SUPABASE_SERVICE_KEY, // full access
  bucketName: 'tepa-images'
};


// Validate configuration
if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.serviceKey) {
  console.error('❌ Missing Supabase configuration!');
  console.log('\n🔧 Setup Instructions:');
  console.log('1. Create a .env file in your project root');
  console.log('2. Add the following variables:');
  console.log('   VITE_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   VITE_SUPABASE_ANON_KEY=your-anon-key-here');
  console.log('3. Create a bucket named "tepa-images" in Supabase Storage');
  console.log('4. Set the bucket to public for direct access');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.serviceKey);

async function createBucketIfNotExists() {
  try {
    // Try to get the bucket
    const { data: bucket, error: getBucketError } = await supabase.storage.getBucket(SUPABASE_CONFIG.bucketName);
    
    if (getBucketError && getBucketError.message.includes('not found')) {
      console.log(`📦 Creating bucket: ${SUPABASE_CONFIG.bucketName}`);
      
      const { data, error: createError } = await supabase.storage.createBucket(SUPABASE_CONFIG.bucketName, {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB limit
      });
      
      if (createError) {
        console.error('❌ Failed to create bucket:', createError.message);
        return false;
      }
      
      console.log('✅ Bucket created successfully');
    } else if (getBucketError) {
      console.error('❌ Error checking bucket:', getBucketError.message);
      return false;
    } else {
      console.log('✅ Bucket already exists');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Bucket setup failed:', error.message);
    return false;
  }
}

async function uploadFile(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    const fileExt = path.extname(fileName).toLowerCase();
    
    // Determine content type
    const contentTypeMap = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp'
    };
    
    const contentType = contentTypeMap[fileExt] || 'image/png';
    
    const { data, error } = await supabase.storage
      .from(SUPABASE_CONFIG.bucketName)
      .upload(fileName, fileBuffer, {
        contentType,
        cacheControl: '31536000', // 1 year cache
        upsert: true // Allow overwriting existing files
      });

    if (error) {
      console.error(`❌ Failed to upload ${fileName}:`, error.message);
      return false;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(SUPABASE_CONFIG.bucketName)
      .getPublicUrl(fileName);

    console.log(`✅ Uploaded: ${fileName} -> ${urlData.publicUrl}`);
    return true;
  } catch (error) {
    console.error(`❌ Error uploading ${fileName}:`, error.message);
    return false;
  }
}

async function uploadImagesFromDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    console.error(`❌ Directory not found: ${directoryPath}`);
    return;
  }

  const files = fs.readdirSync(directoryPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
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
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`✅ Successful uploads: ${successCount}`);
  console.log(`❌ Failed uploads: ${failureCount}`);
  console.log(`📁 Total files processed: ${imageFiles.length}`);
}

async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    console.log(`📦 Available buckets: ${data.map(b => b.name).join(', ')}`);
    return true;
  } catch (error) {
    console.error('❌ Supabase connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your Supabase URL and API key');
    console.log('2. Ensure your Supabase project is active');
    console.log('3. Verify Storage is enabled in your Supabase project');
    return false;
  }
}

async function main() {
  console.log('🚀 Supabase Image Upload Script for Tepa Solutions');
  console.log('================================================\n');

  // Test Supabase connection
  const connected = await checkSupabaseConnection();
  if (!connected) {
    process.exit(1);
  }

  // Create bucket if it doesn't exist
  const bucketReady = await createBucketIfNotExists();
  if (!bucketReady) {
    process.exit(1);
  }

  // Upload images from public/images directory
  const imagesPath = 'public/images';
  await uploadImagesFromDirectory(imagesPath);

  console.log('\n🎉 Upload process completed!');
  console.log('\n📝 Next Steps:');
  console.log('1. Verify images are accessible in Supabase Storage dashboard');
  console.log('2. Update your components to use SupabaseImage instead of LocalImage');
  console.log('3. Test the SupabaseImage component in your application');
  console.log('4. Run: npm run migrate-to-supabase analyze');
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
  checkSupabaseConnection,
  createBucketIfNotExists
};