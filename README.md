# Tiny SEO Detector

A tiny and flexible SEO (defects) detector

Usage
```javascript
  const Detector = require('tiny-seo-detector');

  // Get an instance of Detector
  const myDetector = new Detector('<html><h1>Title</h1></html>');

  // Run the defects checker
  myDetector.defects();
```

## TODO
*Implmenetation*
- [X] Reader - From file, stream or text
- [X] Writer - To console, file or stream
- [X] Defects detector - with predefined rules
- [X] Configuration for rules
- [X] Configuration for rule definitions
- [X] Able to define new custom rules by primitive set of keys (required, requiredAttr, maxQuantity, ...)
- [X] Able to toggle or override current rules
- [X] Messages handling and scale-ready

*Tests*
- [ ] Unit test - IO (Read + Write)
- [ ] Unit test - Defects (Validating + rule defining)
- [ ] Unit test - ultilities
- [ ] Intergration tests

