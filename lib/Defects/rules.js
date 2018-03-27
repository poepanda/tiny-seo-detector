/**
 * Rule's definition format and meaning
 * description: a brief description about the rule
 * selector: jQuery-like selector string
 * requireAttrs: required attributes of this element
 */
const DEFAULT_RULES_DEFINITION = {
  imgWithoutAlt: {
    description: 'img tags must have alt attribute',
    selector: 'img',
    requiredAttrs: ['alt'],
  },
  aWithoutRel: {
    description: 'anchor (a) tags must have rel attribute',
    selector: 'a',
    requiredAttrs: ['rel'],
  },
  missingMetaTitle: {
    // TODO: to be defined more
  },
  missingMetaDesciption: {},
  missingMetaKeywords: {},
  tooManyStrong: {},
  duplicateH1: {},
};

const DEFAULT_RULES_CONFIG = {
  imgWithoutAlt: true,
  aWithoutRel: true,
  missingMetaTitle: true,
  missingMetaDesciption: true,
  missingMetaKeywords: true,
  tooManyStrong: true,
  duplicateH1: true,
};

module.exports = {
  DEFAULT_RULES_CONFIG,
  DEFAULT_RULES_DEFINITION
};