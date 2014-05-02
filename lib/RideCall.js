
'use strict';

var invariant = require('./invariant.js');
var sprintf = require('./sprintf.js');

function rolloutTime(ride_call) {
  var pat = /\d/;
  var m = pat.exec(ride_call);
  sprintf("'%s'\nis the ride call that yielded:\n", ride_call, m);
}

function extract(ride_call) {
  var t = rolloutTime(ride_call);
  return null;
}

module.exports = { extract: extract };
