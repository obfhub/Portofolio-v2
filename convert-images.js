const imagemin = require('imagemin').default;
const imageminWebp = require('imagemin-webp').default;
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    console.log('Starting image conversion to WebP...\n');
    
    const files = await imagemin(['public/img/*.{png,jpg,JPG}'], {
      destination: 'public/img',
      plugins: [
        imageminWebp({
          quality: 85,
          alphaQuality: 100
        })
      ]
    });

    console.log('✅ Images converted successfully:');
    if (Array.isArray(files)) {
      files.forEach(file => {
        const fileName = typeof file === 'string' ? file : file.filepath || file.path || 'unknown';
        console.log('  ' + path.basename(fileName));
      });
    }
    
    console.log('\n📝 Updated references needed in:');
    console.log('  - src/views/PortfolioView.vue');
    console.log('  - src/views/AboutView.vue');
    console.log('  - src/views/HomeView.vue');
    
  } catch (error) {
    console.error('❌ Error converting images:', error);
    process.exit(1);
  }
})();
