var EE = require('events').EventEmitter
  , util = require('util');

var Intercom = function() {
  this.models = {};
};

util.inherits( Intercom, EE );

module.exports = exports = Intercom;
