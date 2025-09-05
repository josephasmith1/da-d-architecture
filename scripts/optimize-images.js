const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration for different image formats and sizes
const CONFIGS = {
  hero: {
    widths: [640, 1024, 1920, 3840],
    formats: ['webp', 'avif'],
    quality: { webp: 85, avif: 80, jpeg: 85 }
  },
  gallery: {
    widths: [320, 640, 1024, 1920],
    formats: ['webp', 'avif'],
    quality: { webp: 80, avif: 75, jpeg: 80 }
  },
  thumbnail: {
    widths: [150, 300, 600],
    formats: ['webp'],
    quality: { webp: 75, jpeg: 75 }
  }
};

async function optimizeImage(inputPath, outputDir, config) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const results = [];
  
  for (const format of config.formats) {
    for (const width of config.widths) {
      const outputName = `${filename}-${width}w.${format}`;
      const outputPath = path.join(outputDir, outputName);
      
      try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        
        // Skip if the target width is larger than the original
        if (width > metadata.width) continue;
        
        await image
          .resize(width, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .toFormat(format, {
            quality: config.quality[format] || 80,
            effort: 6
          })
          .toFile(outputPath);
        
        const stats = await fs.stat(outputPath);
        results.push({
          path: outputPath,
          size: stats.size,
          width,
          format
        });
        
        console.log(`✓ Created ${outputName} (${(stats.size / 1024).toFixed(1)}KB)`);
      } catch (error) {
        console.error(`✗ Failed to create ${outputName}:`, error.message);
      }
    }
  }
  
  // Also optimize the original JPEG
  const jpegOutputPath = path.join(outputDir, `${filename}-optimized.jpg`);
  try {
    await sharp(inputPath)
      .jpeg({ quality: config.quality.jpeg || 80, progressive: true })
      .toFile(jpegOutputPath);
    
    const stats = await fs.stat(jpegOutputPath);
    console.log(`✓ Optimized original JPEG (${(stats.size / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`✗ Failed to optimize JPEG:`, error.message);
  }
  
  return results;
}

async function processDirectory(dirPath, configType = 'gallery') {
  const outputDir = path.join(dirPath, '.optimized');
  
  // Create output directory
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  const files = await fs.readdir(dirPath);
  const imageFiles = files.filter(file => 
    file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('-optimized')
  );
  
  console.log(`\n📁 Processing ${dirPath}`);
  console.log(`Found ${imageFiles.length} images to optimize\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(dirPath, file);
    const stats = await fs.stat(inputPath);
    totalOriginalSize += stats.size;
    
    console.log(`\n🖼️  Processing ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
    const results = await optimizeImage(inputPath, outputDir, CONFIGS[configType]);
    
    totalOptimizedSize += results.reduce((sum, r) => sum + r.size, 0);
  }
  
  const savings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`\n✅ Optimization complete!`);
  console.log(`Original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Optimized: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Savings: ${savings}%`);
}

async function main() {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  
  try {
    const projects = await fs.readdir(projectsDir);
    
    for (const project of projects) {
      const projectPath = path.join(projectsDir, project);
      const stats = await fs.stat(projectPath);
      
      if (stats.isDirectory() && project !== '.DS_Store') {
        await processDirectory(projectPath);
      }
    }
    
    console.log('\n🎉 All images optimized successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Review optimized images in .optimized directories');
    console.log('2. Replace original images with optimized versions');
    console.log('3. Update image references to use srcset for responsive loading');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}