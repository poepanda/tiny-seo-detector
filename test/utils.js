/**
 * A set of extracted useful functions that would be used accross the tests
 */
const { parseMessage } = require('../lib/utils');

// Convert a issue object into result message
exports.toMessage = ({ msg, data }) => parseMessage(msg, data);

// Mock console.log function for testing
exports.mockConsoleLog = (expected, done) => {
  const oldLog = console.log;
  console.log = (message) => {
    if (typeof expected === 'string') {
      expect(message).toBe(expected);
    }
    if (Array.isArray(expected)) {
      for (let item of expected) {
        expect(message).toContain(item);
      }
    }
    console.log = oldLog;
    done();
  }
};