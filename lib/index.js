var EE = require('eventemitter2').EventEmitter2
  , util = require('util');

var Intercom = function() {
  this.models = {};

  var options = {
    wildcard: true,
    delimiter: ':',
    newListener: false
  };

  EE.call(this, options);

  return this;
};

util.inherits( Intercom, EE );

Intercom.prototype.listenerCount = function(event) {
  return this.listeners(event).length;
}

module.exports = exports = Intercom;
