var baz = require("./baz");

module.exports = function(ref) {
  baz(ref + " -> qux");
};
