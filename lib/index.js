var EE = require('eventemitter2').EventEmitter2,
  _ = require('underscore'),
  util = require('util');

var Intercom = function(options) {
  this._req = null;
  this._res = null;
  this._next = null;

  if(options && options.hasOwnProperty('tenant_id')){
    this.tenant_id = options.tenant_id;
  }

  if(options && options.hasOwnProperty('app_id')){
    this.app_id = options.app_id;
  }

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
  console.log('returning middleware in init');
  var _this = this;

  return function(req, res, next) {
    // console.log('running intecom init');
    // console.log(req);

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
  // if no event exists for checking access, assume 
  // all operations should be allwed
  if( this.listenerCount('facet:check:access') > 0 ) {
    this.emit('facet:check:access', action, cb);
  }
  else {
    cb(true);
  }
};

module.exports = exports = Intercom;
