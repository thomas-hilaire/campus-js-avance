const fs = require('fs');

function readAlpsDir() {
    const readdirPromise = fs.promises.readdir(__dirname);
    const readAlpsDir = readdirPromise
        .then(files => {
            // files : ['file1', 'file2']
            const transformed = files.map(file => ({name: file, isFolder: true}));
            // transformed: [{name: 'file1', isFolder: true}, {name: 'file2', isFolder: true}]
            return transformed;
        });
    return readAlpsDir;
}

function readdir() {
    return new Promise((resolve, reject) => {
        fs.readdir(__dirname, (err, files) => {
            if (err) {
                return reject(err);
            }
            return resolve(files);
        });
    });
}

module.exports = {readdir, readAlpsDir};
