
// const Detector = require('../lib/Detector');

// const fs = require('fs');

// const fileInput = { file: './test/good-seo.html' };

// const htmlStream = fs.createReadStream('./test/stream-seo.html');

// const streamInput = { stream: htmlStream }
// const streamOutput = fs.createWriteStream('./streamResult.txt');

// const textInput = '<body></body>';

// const fileDetector = new Detector(fileInput, 'result.txt');
// const streamDetector = new Detector(streamInput, streamOutput);
// const textDetector = new Detector(fileInput);

// Detector.defineDefectsRule([
//   {
//     id: 'tooManyH2',
//     selector: 'h2',
//     tagHtml: '<h2/>',
//     maxQuantity: 3,
//     failMessage: 'This HTML have more than {{maxQuantity}} {{{tagHtml}}} tag'
//   },
//   {
//     id: 'h1IsRequired',
//     selector: 'h1',
//     tagHtml: '<h1>',
//     required: true,
//     failMessage: 'This HTML without {{{tagHtml}}} tag',
//   }
// ]);

// fileDetector.defects({
//   overrideDefinition: { tooManyStrong: { maxQuantity: 15 } }
// });
// streamDetector.defects();
// textDetector.defects();

test('just a file to store sample! Nothing to test lah', function() {
  expect(0).toBe(0);
})