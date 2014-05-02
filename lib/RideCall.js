
'use strict';

var parseDT = require('./parsing/dateTime.js');

function extract(ride_call) {
  var t = parseDT(ride_call);
  return null;
}

module.exports = { extract: extract };
