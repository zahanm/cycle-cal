
'use strict';

var invariant = require('../invariant.js');
var printf = require('../printf.js');
var sprintf = require('../sprintf.js');

function parse(/*string*/ ride_call) /*Date*/ {
  var t = new Date();
  var pat = /(\d{1,2}):?(\d{2})/;
  var m = pat.exec(ride_call);
  if (m) {
    t.setHours(m[1]);
    t.setMinutes(m[2])
    printf("%s => '%s'", formatDateTime(t), ride_call);
  } else {
    printf("fail        => '%s'", ride_call);
  }
}

/*
 * Implementation
 */

var days_of_week = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

function repeat(/*string*/ s, /*number*/ n) /*string*/ {
  var r = '';
  while (n > 0) {
    r += s
    n--;
  }
  return r;
}

function padN(/*number*/ n, /*number*/ p) /*string*/ {
  var s = n.toString();
  return repeat('0', p - s.length) + s;
}

function formatDateTime(/*Date*/ dt) /*string*/ {
  return sprintf(
    '%s %s/%s at %s:%s%s',
    days_of_week[dt.getDay()],
    padN(dt.getMonth() + 1, 2),
    padN(dt.getDate(), 2),
    padN(dt.getHours() % 12, 2),
    padN(dt.getMinutes(), 2),
    dt.getHours() < 12 ? 'AM': 'PM'
  );
}

module.exports = parse;
