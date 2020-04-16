const fs = require('fs');

async function readAlpsDir() {
    const files = await fs.promises.readdir(__dirname);
    return files.map(file => ({name: file, isFolder: true}));
}

module.exports = {readAlpsDir};
