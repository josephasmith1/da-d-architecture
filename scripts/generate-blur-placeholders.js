const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateBlurDataURL(imagePath) {
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Generate a tiny version of the image
    const buffer = await image
      .resize(10, Math.round(10 * (metadata.height / metadata.width)), {
        fit: 'inside'
      })
      .blur(2)
      .jpeg({ quality: 50, progressive: true })
      .toBuffer();
    
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
    return null;
  }
}

async function processProjectImages() {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  const blurData = {};
  
  try {
    const projects = await fs.readdir(projectsDir);
    
    for (const project of projects) {
      const projectPath = path.join(projectsDir, project);
      const stats = await fs.stat(projectPath);
      
      if (stats.isDirectory()) {
        const files = await fs.readdir(projectPath);
        
        for (const file of files) {
          if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const imagePath = path.join(projectPath, file);
            const relativePath = `/projects/${project}/${file}`;
            
            console.log(`Generating blur placeholder for ${relativePath}...`);
            const blurDataURL = await generateBlurDataURL(imagePath);
            
            if (blurDataURL) {
              blurData[relativePath] = blurDataURL;
            }
          }
        }
      }
    }
    
    // Save blur data to a JSON file
    const outputPath = path.join(process.cwd(), 'src', 'lib', 'blur-placeholders.json');
    await fs.writeFile(outputPath, JSON.stringify(blurData, null, 2));
    
    console.log(`✅ Generated ${Object.keys(blurData).length} blur placeholders`);
    console.log(`📁 Saved to ${outputPath}`);
  } catch (error) {
    console.error('Error processing images:', error);
    process.exit(1);
  }
}

processProjectImages();