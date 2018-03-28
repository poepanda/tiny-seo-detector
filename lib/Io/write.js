/**
 * Including available write/output methods
 */
const { parseMessage } = require('../utils');
const stream = require('stream');
const fs = require('fs');

const writeToConsole = (messages) => {
  console.log('write to console');
  console.log(messages);
}

const writeToStream = (messages, stream) => {
  console.log('write to stream');
  stream.write(messages);
}

const writeToFile = (messages, path) => {
  console.log('write to file');
  fs.writeFileSync(path, messages);
}

module.exports = function(output = console, issues) {
  const messagesArr = [];
  for (let issue of issues) {
    messagesArr.push(parseMessage(issue.msg, issue.data));
  }
  const messages = messagesArr.length ? messagesArr.join('\n') : 'All good!';
  

  if (typeof output === 'object' && output instanceof stream.Writable) {
    return writeToStream(messages, output);
  }

  if (typeof output === 'string') {
    return writeToFile(messages, output);
  }
  
  return writeToConsole(messages);
}