const Defects = require('../../lib/Defects');
const Io = require('../../lib/Io');
const validate = require('../../lib/Defects/validate');
const { mockConsoleLog, toMessage } = require('../utils');
const { htmlTo$ } = require('../../lib/utils');

const sampleHtml = `
  <html>
    <head>
      <title>Sample simple html</title>
      <meta name="keywords" content="sample, simple, html"/>
      <meta name="description" content="sample simple html"/>
      <link href="http://domain.com/a-link/"/>
    </head>
    <body>
      <nav>nav</nav>
      <nav>another nav</nav>

      <h1 class="title">Sample simple html</h1>

      <h2>sub title</h2><h2>sub title</h2><h2>sub title</h2><h2>sub title</h2>
      <h2>sub title</h2><h2>sub title</h2><h2>sub title</h2><h2>sub title</h2>
      <h2>sub title</h2><h2>sub title</h2><h2>sub title</h2><h2>sub title</h2>
      <h2>sub title</h2><h2>sub title</h2><h2>sub title</h2><h2>sub title</h2>
    </body>
  </html>
`

// The output => console (by default)
const sampleIo = new Io(sampleHtml);

const newRules = {
  linkMissingRel: {
    id: 'linkMissingRel',
    selector: 'link',
    tagHtml: '<link/>',
    requiredAttr: 'rel',
    failMessage: 'There are {{quantity}} {{{tagHtml}}} without {{requiredAttr}} attribute'
  },
  missingMetaContentType: {
    id: 'missingMetaContentType',
    selector: 'meta[http-equiv="content-type"]',
    tagHtml: '<meta http-equiv="content-type"/>',
    required: true,
    failMessage: 'This HTML is missing {{{tagHtml}}} tag'
  },
  uniqueNavTag: {
    id: 'uniqueNavTag',
    selector: 'nav',
    tagHtml: '<nav>',
    unique: true,
    failMessage: 'This HTML have more than one {{{tagHtml}}} tag'
  },
  tooManyH2: {
    id: 'tooManyH2',
    selector: 'h2',
    tagHtml: '<h2>',
    maxQuantity: 15,
    failMessage: 'There are more than {{maxQuantity}} {{{tagHtml}}} tag in this HTML'
  }
}

describe('Defects - define a new custom rules', () => {
  const sample$ = htmlTo$(sampleHtml);

  test('New rule - required attribute', () => {
    const newRule = newRules.linkMissingRel;
    const message = toMessage(validate(sample$, newRule));
    expect(message).toBe('There are 1 <link/> without rel attribute');
  })

  test('New rule - with required tag', () => {
    const newRule = newRules.missingMetaContentType;
    const message = toMessage(validate(sample$, newRule));
    expect(message).toBe('This HTML is missing <meta http-equiv="content-type"/> tag');
  })

  test('New rule - unique tag', () => {
    const newRule = newRules.uniqueNavTag;
    const message = toMessage(validate(sample$, newRule));
    expect(message).toBe('This HTML have more than one <nav> tag');
  })

  test('New rule - exceed max quantity of specific tag', () => {
    const newRule = newRules.tooManyH2;
    const message = toMessage(validate(sample$, newRule));
    expect(message).toBe('There are more than 15 <h2> tag in this HTML');
  })

  test('Define a single new rule using Defects class - <link> tag without rel attribute', (done) => {
    mockConsoleLog('There are 1 <link/> without rel attribute', done);
    Defects.defineRule(newRules.linkMissingRel);
    const defects = new Defects(sampleIo);
    defects.run();
  })

  test('Define a list of new rules using Defects class', (done) => {
    mockConsoleLog(
      [
        'There are 1 <link/> without rel attribute',
        'This HTML is missing <meta http-equiv="content-type"/> tag',
      ],
      done
    )
    Defects.defineRule([
      newRules.linkMissingRel,
      newRules.missingMetaContentType,
    ]);

    const defects = new Defects(sampleIo);
    defects.run();

  })
})