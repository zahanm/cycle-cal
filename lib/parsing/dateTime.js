
'use strict';

var invariant = require('../invariant.js');
var printf = require('../printf.js');
var sprintf = require('../sprintf.js');

function parse(/*string*/ ride_call) /*Date*/ {
  var final_dt = blankDate();

  var parsers = [
    simpleTime,
    numericDate,
    textDate,
  ];

  parsers.forEach(function(p) {
    var dt = p(ride_call);
    if (dt) {
      Object.keys(dt).forEach(function(k) {
        if (dt[k] !== null) { final_dt[k] = dt[k]; }
      });
    }
  });

  printf("%s => '%s'", formatDateTime(final_dt), ride_call);
}

function simpleTime(/*string*/ ride_call) /*?object*/ {
  var pat = /(^|\D)(\d{1,2}):?(\d{2})(\D|$)/;
  var m = pat.exec(ride_call);
  if (m) {
    var dt = blankDate();
    dt.hour = parseInt(m[2], 10);
    dt.minute = parseInt(m[3], 10);
    return dt;
  }
  return null;
}

function numericDate(/*string*/ ride_call) /*?object*/ {
  var pat = /(^|\D)(\d{1,2})(\/|-)(\d{1,2})(\D|$)/;
  var m = pat.exec(ride_call);
  if (m) {
    var dt = blankDate();
    dt.month = parseInt(m[2], 10);
    dt.day = parseInt(m[4], 10);
    return dt;
  }
  return null;
}

function textDate(/*string*/ ride_call) /*?object*/ {
  var short_months = months_in_year.map(function (m) { return m.slice(0, 3); });
  var pat = new RegExp(
    '(' + months_in_year.join('|') + '|' + short_months.join('|') + ')' +
      '(\\s|,)*' +
      '(\\d{1,2})',
    'i' // ignore case
  );
  var m = pat.exec(ride_call);
  if (m) {
    var dt = blankDate();
    var k = needleInHaystack(months_in_year, m[1], true);
    if (k === null) {
      // fallback to short months
      k = needleInHaystack(short_months, m[1], true);
    }
    if (k) {
        dt.month = parseInt(k, 10) + 1;
    }
    dt.day = parseInt(m[3], 10);
    return dt;
  }
  return null;
}

/*
 * Implementation
 */

var days_of_week = [
  'Sunday',
  'Monday',
  'Tueday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

var months_in_year = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
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

function needleInHaystack(/*array*/ haystack, /*object*/ needle, /*boolean*/ lower_case) {
  var k;
  for (k in haystack) {
    if (haystack.hasOwnProperty(k)) {
      if (haystack[k] === needle) { return k; }
      if (lower_case && haystack[k].toLowerCase && needle.toLowerCase) {
        if (haystack[k].toLowerCase() === needle.toLowerCase()) { return k; }
      }
    }
  }
  return null;
}

function formatDateTime(/*object*/ dt) /*string*/ {
  var d = 'fail';
  if (dt.day !== null && dt.month !== null) {
    var now = new Date();
    var day_of = new Date(now.getFullYear(), dt.month - 1, dt.day);
    d = sprintf(
      '%s %s/%s',
      days_of_week[day_of.getDay()].slice(0, 3),
      padN(dt.month, 2),
      padN(dt.day, 2)
    );
  }
  var t = 'fail';
  if (dt.hour !== null && dt.minute !== null) {
    t = sprintf(
      '%s:%s%s',
      padN(dt.hour % 12, 2),
      padN(dt.minute, 2),
      dt.hour < 12 ? 'AM': 'PM'
    );
  }
  return sprintf('%s at %s', d, t);
}

function blankDate() /*object*/ {
  return {
    month: null,
    day: null,
    hour: null,
    minute: null,
  };
}

module.exports = parse;
