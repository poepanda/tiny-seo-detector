/**
 * SEO Defect class
 * To detect SEO defects
 */
const _ = {
  defaults: require('lodash/defaults')
};

const { DEFAULT_RULES_CONFIG, DEFAULT_RULES_DEFINITION } = require('./rules');
const validate = require('./validate');

const DEFAULT_CONFIG = {
  rules: DEFAULT_RULES_CONFIG
  // Any additional config needed?
}

class Detector {
  // config = {}
  // io = null

  /**
   * 
   * @param {object} io an instance of Io (input/output) class
   * @param {*} config defects config including rules and other config
   */
  constructor(io, config) {
    this.config = _.defaults(config, DEFAULT_CONFIG);
    this.io = io;
    console.log('Defects instance created with config ', this.config)
  }

  /**
   * Run the SEO defects detection
   */
  run() {
    const $ = this.io.$;
    const definition = DEFAULT_RULES_DEFINITION;
    const issues = [];
    for (let rule in this.config.rules) {
      const result = validate($, rule, definition[rule]);
      if (!result.ok) issues.push(result.data);
    }
    this.io.write(issues);
  }

  /**
   * Define a custom rule that can be applied later when detect for SEO defects
   * @param {*} config 
   */
  static defineRule(config) {
    console.log('new rule will be defined with configuration ', config);
  }
}

// Export the detector and something you may need
module.exports = Detector;