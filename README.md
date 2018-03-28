
<h1 align="center">Tiny SEO Detector 😎</h1>

<h5 align="center">A simple, flexible and configurable SEO (defects) detector</h5>

<div align="center">
  <a href="https://travis-ci.org/poepanda/tiny-seo-detector">
    <img src="https://travis-ci.org/poepanda/tiny-seo-detector.svg?branch=master" alt="Travis CI" />
  </a>
  <a href='https://coveralls.io/github/poepanda/tiny-seo-detector?branch=master'>
    <img src='https://coveralls.io/repos/github/poepanda/tiny-seo-detector/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a href="https://snyk.io/test/github/poepanda/tiny-seo-detector?targetFile=package.json">
    <img src="https://snyk.io/test/github/poepanda/tiny-seo-detector/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/poepanda/tiny-seo-detector?targetFile=package.json" style="max-width:100%;">
  </a>
</div>

## Prerequisites

[nodeJS](https://nodejs.org/en/): version 8 and above

## How to install

Using npm
```
npm install tiny-seo-detector
```

or with Yarn
```
yarn add tiny-seo-detector
```

## Usage
```javascript
  const Detector = require('tiny-seo-detector');

  // Get an instance of Detector
  // const detector = new Detector(input, output, config);
  const myDetector = new Detector('<html><h1>Title</h1></html>');

  // Run the defects checker and get the result
  myDetector.defects();
```

❗ **Before you continue, read this:**
- This detector work (detect defects) base on rules
- Rules will be defined based on primitive conditions and meta data
- Primitive condition can be one of these:
  - Is this element required
  - This element required a specific attribute
  - This element has to be unique
  - The number of this element can't be more than a limit
  - ... *can be added more later*
- There will be a list of pre-defined rules
- Rules configuration will define which rule is on/off
- Rules definition will define how the rule is validate and also the fail output message
- You set the input and output on Detector instance
- You set the configuration for defects when call **defects** method

### Input

The input is configured on Detector instance and can be either a HTML plain text
```javascript
const myDetector = new Detector('<html><h1>HTML TITLE</h1></html>');
```

Or a file
```javascript
const myDetector = new Detector({ file: '<path_of_html_file>');
```

Or a readable stream
```javascript
const readableStream = fs.createReadStream('./really-bad-seo.html');
const myDetector = new Detector({ stream: readableStream });
```

### Output

The output can be either by console (by Default)
```javascript
const myDetector = new Detector('<html><h1>HTML TITLE</h1></html>', console);
// Or const myDetector = new Detector('<html><h1>HTML TITLE</h1></html>');
```

Or to a file
```javascript
const myDetector = new Detector('<html><h1>HTML TITLE</h1></html>', '<path_of_file>');
```

Or to a writabe stream
```javascript
const writableStream = fs.createWriteStream('./really-bad-seo.html');
const myDetector = new Detector('<html><h1>HTML TITLE</h1></html>', writableStream);
```

### Configured rules
You can toggle specific rules by passing **rules** options into defects method as following

**Notes: All rules are turned on (true) by default**

```javascript
  // Run defects checker with custom rules config
  myDefector.defects({
    rules: {
      tooManyStrong: false // Turn off this rule => no more validation on this
    }
  });
```

*Predefined/Default rules config*
```javascript
DEFAULT_RULES_CONFIG = {
  imgWithoutAlt: true,
  aWithoutRel: true,
  missingMetaTitle: true,
  missingMetaDesciption: true,
  missingMetaKeywords: true,
  tooManyStrong: true,
  duplicatedH1: true,
}
```

### Defects Rules definition

Every rule is defined base on a set of meta and condition field

For example, The rule "**alt** attribute is required in **img** tag" will be defined as: 
```javascript
{
  id: 'imgWithoutAlt',
  description: 'Img tag without alt attribute',
  selector: 'img',
  tagHtml: '<img>',
  requiredAttr: 'alt',
  // failMessage is a Handlebars template, will be explain more below
  failMessage: 'There is {{quantity}} {{{tagHtml}}} tag without {{requiredAttr}} attribute'  
}
```

**Available fields**

*Meta fields*

- `id`: (required) ID of the rule. For example: imgWithoutAlt, duplicatedH1, missingTitle, ...
- `description`: (optional) Description about the this rule
- `selector`: (required) jQuery/query-like selector. For example: img, .class-name, #id, ... 
- `tagHtml`: Just a html-friendly display of the tag. For example: `<img>` `<title>` `<meta name="keywords"/>`

*Condition fields*

Primitive condition to form the rule (more like a single condition for one rule for the moment)

- `required`: this element is required in the target html
- `requiredAttr`: name of required attribute in this element
- `maxQuantity`: The number of this element cannot be more than a defined limit
- `unique`: This element has to be unique in the target html

*Input/Output config fields*
- `failMessage`: This message template will be compiled and display to user
  - Using Handlebars templating library
  - Current available expression/variables:
    - `{{{tagHtml}}}`, `{{requiredAttr}}`, `{{maxQuantity}}`: value of corresponding field
    - `{{quantity}}`: additional data - the total number of this element
    - For example: "The {{requiredAttr}} attribute is required in {{{tagHtml}}} tag"

**Define new rules**

```javascript
const Detector = require('tiny-seo-detector');

// Define a new custom rule
Detector.defineDefectRules({
  id: 'linkMissingRel',
  description: 'Rel attribute is required in Link tag',
  selector: 'link',
  tagHtml: '<link/>',
  requiredAttr: 'rel',
  failMessage: 'There are {{quantity}} {{{tagHtml}}} without {{requiredAttr}} attribute'
})

// Or a set of new rules
Detector.defineDefectRules([
  {
    id: 'linkMissingRel',
    description: 'Rel attribute is required in Link tag',
    selector: 'link',
    tagHtml: '<link/>',
    requiredAttr: 'rel',
    failMessage: 'There are {{quantity}} {{{tagHtml}}} without {{requiredAttr}} attribute'
  },
  {
    id: 'missingMetaContentType',
    description: 'Meta content type tag is required',
    selector: 'meta[http-equiv="content-type"]',
    tagHtml: '<meta http-equiv="content-type"/>',
    required: true,
    failMessage: 'This HTML is missing {{{tagHtml}}} tag'
  }
])

```

**Override the current rule**
```
...
myDetector.defects({
  overrideDefinition: {
    tooManyStrong: {
      // Change the maximum number of strong tag to 20
      maxQuantity: 20
      // And the fail message
      failMessage: 'You have too many {{{tagHtlm}}} tag lah'
    }
  }
});
```
## API

To be updated!

## License

MIT