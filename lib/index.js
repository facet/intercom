var EE = require('eventemitter2').EventEmitter2,
  _ = require('underscore'),
  util = require('util');

var Intercom = function() {
  this.models = {};
  this._req = null;
  this._res = null;
  this._next = null;

  var options = {
    wildcard: true,
    delimiter: ':',
    newListener: false
  };

  EE.call(this, options);

  this.registerEvents();

  return this;
};

util.inherits( Intercom, EE );


Intercom.prototype.registerEvents = function() {
  this.on('facet:intercom:check:access', this.checkAccess.bind(this));
};

Intercom.prototype.init = function() {
  var _this = this;

  return function(req, res, next) {
    _this._req = req;
    _this._res = res;
    _this._next = next;

    if( _.isFunction(next) ) {
      next();
    }
  }
};

Intercom.prototype.listenerCount = function(event) {
  return this.listeners(event).length;
};


Intercom.prototype.checkAccess = function(action, cb) {
  if( this.listenerCount('facet:check:access') > 0 ) {
    this.emit('facet:check:access', action, cb);
  }
  else {
    cb(null);
  }
};

module.exports = exports = Intercom;
