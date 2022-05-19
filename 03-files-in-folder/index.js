const path = require('path');
const fs = require('fs/promises');
const secretFolderPath = path.join(__dirname, 'secret-folder');

(async () => {
  const files = await fs.readdir(secretFolderPath);
  for (const file of files) {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const stats = await fs.stat(path.resolve(secretFolderPath, file));
    if (stats.isFile()) console.log(`${name} - ${ext} - ${Math.floor(stats.size / 1024)}Kb `);
  }
})();

   

