#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all images
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to group images by their base name
function groupImageVariants(images) {
  const variants = {};

  images.forEach((imagePath) => {
    const relativePath = imagePath.replace(path.join(process.cwd(), 'public'), '');
    const dir = path.dirname(relativePath);
    const filename = path.basename(relativePath);
    
    // Extract base name (remove variant suffixes)
    let baseName = filename
      .replace(/-(portrait|landscape|P|L)(\.[^.]+)$/, '$2')
      .replace(/_(portrait|landscape|P|L)(\.[^.]+)$/, '$2');
    
    const baseKey = path.join(dir, baseName);
    
    if (!variants[baseKey]) {
      variants[baseKey] = {
        base: baseKey,
        variants: []
      };
    }
    
    // Detect orientation from filename
    let orientation = 'landscape'; // default
    if (filename.includes('-portrait') || 
        filename.includes('_portrait') || 
        filename.includes('-P.') || 
        filename.includes('_P.')) {
      orientation = 'portrait';
    } else if (filename.includes('-L.') || 
               filename.includes('_L.') || 
               filename.includes('-landscape') || 
               filename.includes('_landscape')) {
      orientation = 'landscape';
    }
    
    variants[baseKey].variants.push({
      path: relativePath,
      orientation: orientation,
      filename: filename
    });
  });

  return variants;
}

// Generate manifest
function generateManifest() {
  const publicDir = path.join(process.cwd(), 'public', 'projects');
  const images = findImages(publicDir);
  const variants = groupImageVariants(images);
  
  // Write manifest
  const manifestPath = path.join(process.cwd(), 'public', 'image-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(variants, null, 2));
  
  console.log(`✓ Generated image manifest with ${Object.keys(variants).length} image groups`);
  console.log(`✓ Found ${images.length} total images`);
  
  // Show summary
  let portraitCount = 0;
  let landscapeCount = 0;
  Object.values(variants).forEach(group => {
    group.variants.forEach(v => {
      if (v.orientation === 'portrait') portraitCount++;
      else landscapeCount++;
    });
  });
  
  console.log(`  - ${portraitCount} portrait images`);
  console.log(`  - ${landscapeCount} landscape images`);
  console.log(`✓ Manifest saved to: ${manifestPath}`);
}

// Run the script
generateManifest();