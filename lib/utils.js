/**
 * Any thing useful that can be reused?
 */

const handlebars = require('handlebars');
const cheerio = require('cheerio');


exports.parseMessage = function(template = 'Empty message', data) {
  const messageTemplate = handlebars.compile(template);
  return messageTemplate(data);
}

/**
 * Convert Html text into jQuery representation of the dom
 * <body></body> => $('body') ;) Easier right!?
 * @param {string} htmlText 
 */
exports.htmlTo$ = function(htmlText) {
  return cheerio.load(htmlText);
}