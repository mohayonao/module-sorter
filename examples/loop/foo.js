var bar = require("./bar");
var baz = require("./baz");

module.exports = function(ref) {
  bar(ref + " -> foo");
  baz(ref + " -> foo");
};
