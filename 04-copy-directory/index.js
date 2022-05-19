const path = require('path');
const fs = require('fs/promises');

const dir = path.join(__dirname, 'files');
const dirCopy = path.join(__dirname, 'files-copy');

(async () => {
  await fs.rm(dirCopy, { recursive: true, force: true });
  await fs.mkdir(dirCopy,);
  const files = await fs.readdir(dir, { withFileTypes: true });
  files.forEach(async (file) => {
    if (file.isFile()) {
      await fs.copyFile(path.join(dir, file.name), path.join(dirCopy, file.name));
    }
  });
})();
