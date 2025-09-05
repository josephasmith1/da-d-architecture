const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const LOGO_SVG = path.join(__dirname, '../public/DAd LOGO copy 01-02.svg');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Icon sizes configuration
const ICON_SIZES = {
  // Standard favicon sizes
  favicon: [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
  ],
  // Apple Touch Icons
  apple: [
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 152, name: 'apple-touch-icon-152x152.png' },
    { size: 120, name: 'apple-touch-icon-120x120.png' },
    { size: 76, name: 'apple-touch-icon-76x76.png' },
    { size: 60, name: 'apple-touch-icon-60x60.png' },
  ],
  // Android Chrome Icons
  android: [
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
    { size: 384, name: 'android-chrome-384x384.png' },
    { size: 256, name: 'android-chrome-256x256.png' },
  ],
  // PWA Icons
  pwa: [
    { size: 72, name: 'icon-72x72.png' },
    { size: 96, name: 'icon-96x96.png' },
    { size: 128, name: 'icon-128x128.png' },
    { size: 144, name: 'icon-144x144.png' },
    { size: 152, name: 'icon-152x152.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 384, name: 'icon-384x384.png' },
    { size: 512, name: 'icon-512x512.png' },
  ],
  // Microsoft Tile Icons
  mstile: [
    { size: 150, name: 'mstile-150x150.png' },
    { size: 310, name: 'mstile-310x310.png' },
    { size: 70, name: 'mstile-70x70.png' },
    { size: 310, name: 'mstile-310x150.png', width: 310, height: 150 },
  ],
  // Safari Pinned Tab
  safari: [
    { size: 16, name: 'safari-pinned-tab.svg', format: 'svg' },
  ]
};

async function generateIcon(inputPath, outputPath, size, height = null) {
  try {
    const width = size;
    const finalHeight = height || size;
    
    // Read the SVG
    const svgBuffer = await fs.readFile(inputPath);
    
    // For SVG output, just copy (Safari pinned tab)
    if (outputPath.endsWith('.svg')) {
      await fs.writeFile(outputPath, svgBuffer);
      console.log(`✓ Generated ${path.basename(outputPath)}`);
      return;
    }
    
    // Generate PNG with white background for better visibility
    await sharp(svgBuffer)
      .resize(width, finalHeight, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .flatten({ background: '#ffffff' })
      .png()
      .toFile(outputPath);
    
    console.log(`✓ Generated ${path.basename(outputPath)} (${width}x${finalHeight})`);
  } catch (error) {
    console.error(`✗ Failed to generate ${path.basename(outputPath)}:`, error.message);
  }
}

async function generateFavicon() {
  try {
    // Read the SVG to create multi-size ICO
    const svgBuffer = await fs.readFile(LOGO_SVG);
    
    // Generate different sized PNGs for ICO file
    const sizes = [16, 32, 48];
    const buffers = await Promise.all(
      sizes.map(size =>
        sharp(svgBuffer)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .flatten({ background: '#ffffff' })
          .png()
          .toBuffer()
      )
    );
    
    // For now, use the 48x48 as favicon.ico
    // (Note: Proper ICO generation would require additional libraries)
    await fs.writeFile(
      path.join(PUBLIC_DIR, 'favicon.ico'),
      buffers[2]
    );
    
    console.log('✓ Generated favicon.ico');
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }
}

async function generateAllIcons() {
  console.log('🎨 Starting favicon generation from SVG logo...\n');
  
  // Check if logo exists
  try {
    await fs.access(LOGO_SVG);
  } catch {
    console.error(`❌ Logo SVG not found at ${LOGO_SVG}`);
    process.exit(1);
  }
  
  // Generate all icon categories
  for (const [category, icons] of Object.entries(ICON_SIZES)) {
    console.log(`\n📁 Generating ${category} icons...`);
    
    for (const icon of icons) {
      const outputPath = path.join(PUBLIC_DIR, icon.name);
      await generateIcon(
        LOGO_SVG,
        outputPath,
        icon.size,
        icon.height
      );
    }
  }
  
  // Generate favicon.ico
  console.log('\n📁 Generating favicon.ico...');
  await generateFavicon();
  
  console.log('\n✅ All favicons generated successfully!');
}

// Run the script
generateAllIcons().catch(console.error);