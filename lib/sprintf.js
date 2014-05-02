
'use strict';

var util = require('util');

module.exports = function(/*fmt, ...args*/) /*string*/ {
  return util.format.apply(util, arguments);
}
