const read = require('../../lib/Io/read');
const path = require('path');
const fs = require('fs');

const sampleSimpleHtml = `
  <html>
    <head>
      <!--- head --->
    </head>
    <body>
      <!--- body --->
    </body>
  </html>
`;

const sampleHtmlFilePath = path.join(__dirname, '../html/good-seo.html');

describe('IO - Read - should Produce correct jQuery-dom', () => {
  
  test('With null/undefined input passed - fallback to empty body', (done) => {
    read(null, $ => {
      expect($('body').length).toBe(1);
      done();
    })
  })

  test('with html text passed', (done) => {
    read(sampleSimpleHtml, $ => {
      expect($('body').length).toBe(1);
      expect($('head').length).toBe(1);
      done();
    })
  });

  test('with a file passed', (done) => {
    read({ file: sampleHtmlFilePath }, $ => {
      expect($('body').length).toBe(1);
      expect($('head > title').length).toBe(1);
      done();
    });
  })

  test('with a Readable stream passed', (done) => {
    read({ stream: fs.createReadStream(sampleHtmlFilePath) }, $ => {
      expect($('body').length).toBe(1);
      expect($('head > title').length).toBe(1);
      done();
    })
  })

})