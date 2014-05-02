
'use strict';

var GroupsAPI = require('./GroupsAPI.js');
var RideCall = require('./RideCall.js');

var invariant = require('./invariant.js');

var subjects = GroupsAPI.fetchPosts();
// console.log('There are ' + subjects.length + ' examples');

var ride_calls = subjects.map(function (subject) {
  return RideCall.extract(subject);
});

ride_calls = ride_calls.filter(function (r) { return !!r; })

var full_calls = ride_calls.filter(function (ride) {
  return ride.isFullCall();
});

console.log('Extracted (partial) ' + ride_calls.length + ' calls');
console.log('Extracted (full) ' + full_calls.length + ' calls');
