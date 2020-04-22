const path = require('path');

function joinPath(path1, path2) {
  return path.join(path1, path2);
}

module.exports = {joinPath};

