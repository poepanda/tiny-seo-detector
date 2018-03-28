/**
 * The validator that verify the rules base on user config
 */

const validate = function($, ruleDef = {}) {
  // console.log('validate the rule', ruleDef);
  const {
    selector,
    required,
    unique,
    requiredAttr,
    maxQuantity,
  } = ruleDef;
  const elem = $(selector);
  const elemCount = elem.length;
  
  /**
   * Check for required tag
   */
  if (required && !elemCount) {
    return {
      msg: ruleDef.failMessage,
      data: { tagHtml: ruleDef.tagHtml }
    };
  }

  /**
   * Check for required attribute(s) of specific tag
   */
  if (requiredAttr) {
    let failCount = 0;
    elem.each(function() {
      if (!$(this).attr(requiredAttr)) failCount++;
    });
    if (failCount > 0) {
      return {
        msg: ruleDef.failMessage,
        data: {
          tagHtml: ruleDef.tagHtml,
          quantity: failCount,
          requiredAttr: requiredAttr,
        }
      }
    }
  }

  /**
   * Check for the tag that have more than neccessary quantity
   */
  if (maxQuantity && elemCount > maxQuantity) {
    return {
      msg: ruleDef.failMessage,
      data: {
        tagHtml: ruleDef.tagHtml,
        maxQuantity,
      }
    }
  }

  /**
   * Check for the tag that's supposed to be unique but have more than one
   */
  if (unique && elemCount > 1) {
    return {
      msg: ruleDef.failMessage,
      data: {
        tagHtml: ruleDef.tagHtml
      }
    };
  }

  return false;
}

module.exports = validate;