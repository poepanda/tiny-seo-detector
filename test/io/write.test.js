const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');
const write = require('../../lib/Io/write');
const { mockConsoleLog } = require('../utils');
const simpleIssues = [
  { 
    msg: 'simple message about {{something}}',
    data: { something: 'a thing' }
  } 
];
const outputMessage = 'simple message about a thing';

const cleanFile = (file) => fs.existsSync(file) && fs.unlinkSync(file);

describe('IO - Write', () => {
  
  test('Write to console should work correctly', (done) => {
    mockConsoleLog(outputMessage, done);
    write( null, simpleIssues );
  })

  test('Write to file should work correctly', () => {
    const file = path.join(__dirname, 'viaFileWrite.temp.txt');
    cleanFile(file);

    write(file, simpleIssues);
    expect(fs.readFileSync(file).toString()).toBe(outputMessage);
  });

  test('Write to stream should work correctly', (done) => {
    const fileToStream = path.join(__dirname, 'viaStream.temp.txt')
    cleanFile(fileToStream);
    const writeStream = fs.createWriteStream(fileToStream);
    writeStream._write = function(chunk) {
      expect(chunk.toString()).toBe(outputMessage);
      done();
    }

    write(writeStream, simpleIssues);
  })

})