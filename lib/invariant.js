
'use strict';

var util = require('util');

function invariant(/*bool*/ condition, /*string*/ fmt /*, ...args*/) /*void*/ {
  if (!condition) {
    var fmt_args = Array.prototype.slice.call(arguments, 1);
    var error_message = util.format.apply(util, fmt_args);
    throw new Error('Invariant violation: ' + error_message);
  }
};

module.exports = invariant;
