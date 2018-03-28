/**
 * SEO Defect class
 * To detect SEO defects
 */
const _ = {
  defaults: require('lodash/defaults'),
  defaultsDeep: require('lodash/defaultsDeep'),
  isArray: require('lodash/isArray'),
};

const {
  DEFAULT_RULES_CONFIG,
  DEFAULT_RULES_DEFINITION,
  RULE_DEFINITION_TEMPLATE
} = require('./rules');
const validate = require('./validate');

const DEFAULT_CONFIG = {
  // Any additional config needed?
}

let rulesDef = Object.assign({}, DEFAULT_RULES_DEFINITION);
let rulesConf = Object.assign({}, DEFAULT_RULES_CONFIG);

class Defects {
  // config = {}
  // io = null

  /**
   * @param {object} io an instance of Io (input/output) class
   * @param {*} config defects config including rules and other config
   */
  constructor(io, config) {
    this.config = _.defaultsDeep(config, DEFAULT_CONFIG);
    this.io = io;
  }

  /**
   * Run the SEO defects detection
   */
  run() {
    const io = this.io;
    const { rules, overrideDefinition } = this.config
    
    // get$ will return a promise which resolve the $ object returned from the reader. 
    io.get$
      .then(($) => {
        const results = [];
    
        const completedRulesDef = _.defaultsDeep(overrideDefinition, rulesDef);
        const completedRulesConf = _.defaults(rules, rulesConf);
    
        for (let rule in completedRulesConf) {
          if (!completedRulesConf[rule]) continue;
          const issue = validate($, completedRulesDef[rule]);
          if (issue) results.push(issue);
        }

        io.write(results);
      })
      .catch(err => console.error('Deffects errors: ', err));

  }

  /**
   * Define a custom rule that can be applied later when detect for SEO defects
   * @param {*} config 
   */
  static defineRule(config) {

    const assignNewDef = (rule) => {
      rulesDef[rule.id] = _.defaults(rule, RULE_DEFINITION_TEMPLATE);
      rulesConf[rule.id] = true;
    }

    if (_.isArray(config)) {
      for (let rule of config) assignNewDef(rule);
    } else {
      assignNewDef(config);
    }

  }

}

// Export the detector and something you may need
module.exports = Defects;