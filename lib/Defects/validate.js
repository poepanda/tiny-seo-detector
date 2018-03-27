/**
 * The validator that verify the rules base on user config
 */

const validate = function($, rule, ruleDefinition) {
  console.log('validate the rule', rule, ruleDefinition);
  return {
    ok: false,
    data: { message: 'not okay' }
  }
}

module.exports = validate;