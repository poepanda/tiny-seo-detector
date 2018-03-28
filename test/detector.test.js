const fs = require('fs');
const path = require('path');
const Detector = require('../lib/Detector');
const { mockConsoleLog } = require('./utils');

const goodHtmlPath = path.join(__dirname, './html/good-seo.html');
const badHtmlPath = path.join(__dirname, './html/bad-seo.html');

describe('Detector - SEO Defects', () => {

  test('SEO defects - default rules with good result', (done) => {
    mockConsoleLog('All good!', done)
    const detector = new Detector({ file: goodHtmlPath });
    detector.defects();    
  });

  test('SEO defects - default rules with bad result', (done) => {
    mockConsoleLog(
      [
        'There are 2 <img> without alt attribute',
        'There are 2 <a> without rel attribute',
        'This HTML without <title> tag',
        'This HTML without <meta name="description"/> tag',
        'This HTML without <meta name="keywords"/> tag',
        'This HTML have more than 15 <strong> tag',
        'This HTML have more than one <h1> tag',
      ],
      done
    )
    const detector = new Detector({ file: badHtmlPath });
    detector.defects();  
  });

  test('SEO defects - new rules with bad result', (done) => {
    mockConsoleLog('This HTML is missing <meta name="robots"/> tag', done);
    const missingMetaRobots = {
      id: 'missingMetaRobots',
      selector: 'meta[name="robots"]',
      tagHtml: '<meta name="robots"/>',
      required: true,
      failMessage: 'This HTML is missing {{{tagHtml}}} tag'
    };

    const detector = new Detector({ file: goodHtmlPath });
    Detector.defineDefectRules(missingMetaRobots);
    detector.defects();  
  })

})