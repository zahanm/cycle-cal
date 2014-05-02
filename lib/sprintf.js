
'use strict';

var util = require('util');

module.exports = function(/*fmt, ...args*/) {
  util.puts(util.format.apply(util, arguments));
}
