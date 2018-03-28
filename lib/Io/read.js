/**
 * Including available read/input methods
 */

const cheerio = require('cheerio');
const fs = require('fs');

const htmlTo$ = (htmlText, cb) => {
  return cheerio.load(htmlText);
}

const readFromFile = (path, cb) => {
  return cb(htmlTo$(fs.readFileSync(path)));
}

const readFromStream = (stream, cb) => {
  stream.on('data', (html) => {
    cb(htmlTo$(html.toString()))
  })
}

module.exports = function(input = '', cb = () => {}) {
  if (typeof input === 'string') {
    return cb(htmlTo$(input));
  }

  if (input instanceof Object) {
    if (input.file) return readFromFile(input.file, cb);
    if (input.stream) return readFromStream(input.stream, cb);
  }

  return cb(cheerio.load('<body></body>'));
}