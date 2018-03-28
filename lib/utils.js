/**
 * Any thing useful that can be reused?
 */

const handlebars = require('handlebars');


exports.parseMessage = function(template, data) {
  const messageTemplate = handlebars.compile(template);
  return messageTemplate(data);
}