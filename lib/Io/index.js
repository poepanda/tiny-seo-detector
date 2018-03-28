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

  constructor(input, output) {
    this.input = input;
    this.output = output;
    this.get$ = new Promise((resolve, reject) => {
      try {
        read(this.input, ($) => {
          resolve($);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  write(issues) {
    write(this.output, issues);
  }

  defineRule(config) {
    console.log('define defects rules with config', config);
  }
}

module.exports = Io;