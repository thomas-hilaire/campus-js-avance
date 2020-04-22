const fs = require('fs');

function lireFichiers() {
    fs.promises.readdir(__dirname, {withFileTypes: true})
        .then(dirents => transformDirents(dirents))
        .then(alpsItems => waitForAllSize(alpsItems))
        .then(allItems => {
            console.log('ALL RESOLVED', allItems);
        });
}

function transformDirents(dirents) {
    return dirents.map(dirent => transformDirentToAlpsItem(dirent));
}

function transformDirentToAlpsItem(dirent) {
    if (dirent.isDirectory()) {
        return {name: dirent.name, isFolder: true};
    }
    return fs.promises.stat(`${__dirname}/${dirent.name}`)
        .then(stat => {
            return {name: dirent.name, isFolder: false, size: stat.size};
        })
}

function waitForAllSize(alpsItems) {
    console.log('ITEMS', alpsItems);
    const all = Promise.all(alpsItems);
    console.log('ALL PROMISE', all);
    return all;
}

lireFichiers();
