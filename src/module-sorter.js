"use strict";

var fs = require("fs");
var path = require("path");
var util = require("util");
var esprima = require("esprima");
var estraverse = require("estraverse");
var toposort = require("toposort");
var Syntax = esprima.Syntax;

function isRequireExpression(node) {
  if (node.type !== Syntax.CallExpression) {
    return false;
  }

  if (node.callee.name !== "require") {
    return false;
  }

  if (node.arguments.length !== 1) {
    return false;
  }

  if (node.arguments[0].type !== Syntax.Literal) {
    return false;
  }

  return true;
}

function startsWith(str, ch) {
  return str.charAt(0) === ch;
}

function extract(filepath) {
  var result = [];
  var src = fs.readFileSync(filepath).toString();

  estraverse.traverse(esprima.parse(src), {
    enter: function(node, parent) {
      if (isRequireExpression(node) && startsWith(node.arguments[0].value, ".")) {
        result.push(node.arguments[0].value);
      }
    }
  });

  return result;
}

function warn(parent, filepath) {
  console.warn(
    util.format("Modules has circulated: %s -> %s", parent, filepath)
  );
}

module.exports.sort = function sort(root) {
  var graph = [];
  var checked = [];

  function walk(parent) {
    checked.push(parent);

    var dirname = path.dirname(parent);

    extract(parent).map(function(filename) {
      return require.resolve(path.join(dirname, filename));
    }).filter(function(filepath) {

      if (checked.indexOf(filepath) !== -1) {
        warn(parent, filepath);
        return false;
      }

      return true;
    }).forEach(function(filepath) {
      graph.push([ parent, filepath ]);

      walk(filepath);
    });

    checked.pop();
  }

  walk(require.resolve(path.resolve(root)));

  return toposort(graph).reverse();
};
