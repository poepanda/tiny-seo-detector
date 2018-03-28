const path = require('path');
const _ = { 
  defaults: require('lodash/defaults')
}
const Defects = require('../../lib/Defects');
const Io = require('../../lib/Io');
const { mockConsoleLog } = require('../utils');


const badIo = new Io({ file: path.join(__dirname, '../html/bad-seo.html')});
const goodIo = new Io({ file: path.join(__dirname, '../html/good-seo.html')});

const offRulesConfig = {
  imgWithoutAlt: false,
  aWithoutRel: false,
  missingMetaTitle: false,
  missingMetaDesciption: false,
  missingMetaKeywords: false,
  tooManyStrong: false,
  duplicatedH1: false
}

describe('Defects - common cases', () => {

  test('Good results with default config', (done) => {
    mockConsoleLog('All good!', done);
    const defects = new Defects(goodIo);
    defects.run();
  });

  test('Custom defect config with only h1 detection turned on', (done) => {
    mockConsoleLog('This HTML without <title> tag', done);
    const onRule = { missingMetaTitle: true };
    const defects = new Defects(badIo, {
      rules: _.defaults(onRule, offRulesConfig)
    });
    defects.run();
  });

  test('custom defect config with override rule definition', (done) => {
    mockConsoleLog('This HTML have more than 20 <strong> tag', done);
    const onRule = { tooManyStrong: true }
    const defects = new Defects(badIo, {
      rules: _.defaults(onRule, offRulesConfig),
      overrideDefinition: {
        tooManyStrong: {
          maxQuantity: 20
        }
      }
    });
    defects.run();
  });
})