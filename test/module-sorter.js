"use strict";

var moduleSorter = require("../");
var path = require("path");
var assert = require("assert");

describe("module-sorter", function() {
  describe(".sort", function() {
    it("should sort by dependencies", function() {
      var actual = moduleSorter.sort("examples/src");

      actual = actual.map(function(filepath) {
        return path.relative(__dirname, filepath);
      });

      var expected = [
        "../examples/src/bar.js",
        "../examples/src/baz.js",
        "../examples/src/foo.js",
        "../examples/src/index.js"
      ];

      assert.deepEqual(actual, expected);
    });
  });
});
