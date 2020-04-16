const fs = require('fs');

function readdir(callback) {
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return callback(err);
        }
        return callback(null, files);
    });
}

module.exports = {readdir};
