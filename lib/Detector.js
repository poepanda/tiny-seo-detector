const _ = {
  defaults: require('lodash/defaults')
};

const Defects = require('./Defects');
const Io = require('./Io')

// Default config of detector
const DEFAULT_CONFIG = {
  
}

class Detector {

  constructor(input, output, config) {
    this.config = _.defaults(config, DEFAULT_CONFIG);
    this.io = new Io(input, output);
  }

  defects(config) {
    this.task = new Defects(this.io, config);
    this.task.run();
  }

  static defineDefectsRule(config) {
    Defects.defineRule(config);
  }
  
}

// Export the detector and something you may need
module.exports = Detector;