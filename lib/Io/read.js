/**
 * Including available read/input methods
 */

const cheerio = require('cheerio');

module.exports = function(input) {
  console.log('read from ', input);
  return cheerio.load('<html><body><h1>hello</h1></body></html>')
}