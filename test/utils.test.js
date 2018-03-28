const { parseMessage, htmlTo$ } = require('../lib/utils');

describe('Utility - Parse Message', () => {


  test('ParseMessage - should produce correct message with template and data provided', () => {
    const aMessageTemplate = "This is a message template with {{normalString}} and {{{HtmlOutput}}}";
    const data = {
      normalString: 'Normal String',
      HtmlOutput: '<h1>Html Output</h1>'
    }
    expect(parseMessage(aMessageTemplate, data)).toBe('This is a message template with Normal String and <h1>Html Output</h1>');
  })

});

describe('Utility - Html to $ converting', () => {

  // Converted HTML 
  const $ = htmlTo$(`
    <html>
      <head>
        <title>Sample simple html</title>
        <meta name="keywords" content="sample, simple, html"/>
        <meta name="description" content="sample simple html"/>
      </head>
      <body>
        <h1 class="title">Sample simple html</h1>
        <img src="image.png" alt/>
        <a href="#"></a>
      </body>
    </html>
  `);

  test('Something should be produced', () => {
    expect($).not.toBeNull();
  })

  /**
   * In fact, we don't really need to test these as it's already covered by Cheerio
   * Just to have more test cases here haha :v
   */

  test('Simple tag selector', () => {
    expect($('body').length).toBe(1);
  })

  test('Class selector', () => {
    expect($('.title').length).toBe(1);
  })

  test('More complex selector with attribute', () => {
    expect($('meta[name="keywords"]').length).toBe(1);
  })
})
