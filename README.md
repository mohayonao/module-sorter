# module-sorter
[![NPM Version](http://img.shields.io/npm/v/module-sorter.svg?style=flat)](https://www.npmjs.org/package/module-sorter)
[![Dependency Status](http://img.shields.io/david/mohayonao/module-sorter.svg?style=flat)](https://david-dm.org/mohayonao/module-sorter)

> Sort modules by dependencies

## Install

```sh
$ npm install module-sorter
```

## Usage

```text
  +---------+
  | main.js |
  +---------+
    | require
    V
  +---------+    +---------+
  | foo.js  | -> | baz.js  |
  +---------+    +---------+
    |               |    ^
    |     +---------+    |
    |     |              |
    V     V              |
  +---------+    +---------+
  | bar.js  |    | qux.js  |
  +---------+    +---------+
```

```javascript
var moduleSorter = require("module-sorter");

moduleSorter.sort("main.js");

// [
//   "path/to/bar.js",
//   "path/to/baz.js",
//   "path/to/foo.js",
//   "path/to/main.js"
// ]
```

## API

  - `sort(root : string) : array[string]`

## License

module-sorter is available under the The MIT License.
