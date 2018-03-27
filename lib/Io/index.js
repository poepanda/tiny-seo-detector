/**
 * This Io will handle the input and output format/method of the modules
 */

const read = require('./read');
const write = require('./write');

class Io {
  // read = require('./read')
  // write = require('./write')

  // To keep original input and output
  // In case we use them
  // input = null
  // output = null

  // The jQuery DOM representation of the input
  // $ = null

  constructor(input, output = console) {
    this.input = input;
    this.output = output;
    this.$ = read(this.input);
  }

  write(issues) {
    for (let issue of issues) {
      write(this.output, issue);
    }
  }

  defineRule(config) {
    console.log('define defects rules with config', config);
  }
}

module.exports = Io;