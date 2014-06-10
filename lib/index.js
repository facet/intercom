var EE = require('eventemitter3').EventEmitter
  , util = require('util');

var Intercom = function() {
  this.models = {};
};

util.inherits( Intercom, EE );

module.exports = exports = Intercom;
