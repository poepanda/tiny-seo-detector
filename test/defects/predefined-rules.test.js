const fs = require('fs');
const path = require('path');
const { toMessage } = require('../utils');

const { 
  DEFAULT_RULES_DEFINITION,
  RULE_DEFINITION_TEMPLATE
} = require('../../lib/Defects/rules');
const validate = require('../../lib/Defects/validate');
const { htmlTo$ } = require('../../lib/utils');

const badSeo$ = htmlTo$(fs.readFileSync(path.join(__dirname, '../html/bad-seo.html')).toString());

describe('Defects - predefined rules', () => {
  
  test('<img> without alt attribute', () => {
    const rule = DEFAULT_RULES_DEFINITION['imgWithoutAlt'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('There are 2 <img> without alt attribute');
  })

  test('<a> without rel attribute', () => {
    const rule = DEFAULT_RULES_DEFINITION['aWithoutRel'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('There are 2 <a> without rel attribute');
  })

  test('Missing <title>', () => {
    const rule = DEFAULT_RULES_DEFINITION['missingMetaTitle'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('This HTML without <title> tag');
  })

  test('Missing meta description', () => {
    const rule = DEFAULT_RULES_DEFINITION['missingMetaDesciption'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('This HTML without <meta name="description"/> tag');
  })

  test('Missing meta keywords', () => {
    const rule = DEFAULT_RULES_DEFINITION['missingMetaKeywords'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('This HTML without <meta name="keywords"/> tag');
  })

  test('Too many strong tag', () => {
    const rule = DEFAULT_RULES_DEFINITION['tooManyStrong'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('This HTML have more than 15 <strong> tag');
  })

  test('Too many strong tag', () => {
    const rule = DEFAULT_RULES_DEFINITION['duplicatedH1'];
    const message = toMessage(validate(badSeo$, rule));
    expect(message).toBe('This HTML have more than one <h1> tag');
  })

})