/**
 * Rule's definition format and meaning
 * description: a brief description about the rule
 * selector: jQuery-like selector string
 * requireAttrs: required attributes of this element
 * required: this element is required in html document
 * maxQuantity: The number of this elements cannot exceed a limited quanitty
 * unique: this element is unique accross the html document
 */

const FAIL_MESSAGES = {
  default: 'Something went wrong but there is no message defined',
  missingRequiredAttr: 'There are {{quantity}} {{{tagHtml}}} without {{requiredAttr}} attribute',
  missingRequiredTag: 'This HTML without {{{tagHtml}}} tag',
  duplicatedTag: 'This HTML have more than one {{{tagHtml}}} tag',
  exceedMaxQuantity: 'This HTML have more than {{maxQuantity}} {{{tagHtml}}} tag'
}

const RULE_DEFINITION_TEMPLATE = {
  description: '',
  selector: '',
  tagHtml: '',
  failMessage: FAIL_MESSAGES.default,
}

const DEFAULT_RULES_DEFINITION = {
  imgWithoutAlt: {
    description: 'img tags must have alt attribute',
    selector: 'img',
    tagHtml: '<img>',
    requiredAttr: 'alt',
    failMessage: FAIL_MESSAGES.missingRequiredAttr,
  },
  aWithoutRel: {
    description: 'anchor (a) tags must have rel attribute',
    selector: 'a',
    tagHtml: '<a>',
    requiredAttr: 'rel',
    failMessage: FAIL_MESSAGES.missingRequiredAttr,
  },
  missingMetaTitle: {
    description: 'There must be a Title tag',
    selector: 'head > title',
    tagHtml: '<title>',
    required: true,
    failMessage: FAIL_MESSAGES.missingRequiredTag,
  },
  missingMetaDesciption: {
    description: 'There must be a meta description tag',
    selector: 'meta[name="description"]',
    tagHtml: '<meta name="description"/>',
    required: true,
    failMessage: FAIL_MESSAGES.missingRequiredTag,
  },
  missingMetaKeywords: {
    description: 'There must be a meta keywords tag',
    selector: 'meta[name="description"]',
    tagHtml: '<meta name="keywords"/>',
    required: true,
    failMessage: FAIL_MESSAGES.missingRequiredTag,
  },
  tooManyStrong: {
    description: 'There are too many <strong> tag',
    selector: 'strong',
    tagHtml: '<strong>',
    maxQuantity: 15,
    failMessage: FAIL_MESSAGES.exceedMaxQuantity,
  },
  duplicatedH1: {
    description: 'There must be only one <h1> tag',
    selector: 'h1',
    tagHtml: '<h1>',
    unique: true,
    failMessage: FAIL_MESSAGES.duplicatedTag,
  },
};

const DEFAULT_RULES_CONFIG = {
  imgWithoutAlt: true,
  aWithoutRel: true,
  missingMetaTitle: true,
  missingMetaDesciption: true,
  missingMetaKeywords: true,
  tooManyStrong: true,
  duplicatedH1: true,
};

module.exports = {
  FAIL_MESSAGES,
  DEFAULT_RULES_CONFIG,
  DEFAULT_RULES_DEFINITION,
  RULE_DEFINITION_TEMPLATE
};