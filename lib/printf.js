'use strict';

var util = require('util');

var sprintf = require('./sprintf.js');

module.exports = function() /*void*/ {
  util.puts(sprintf.apply(sprintf, arguments));
}
