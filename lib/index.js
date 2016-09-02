'use strict'

const EventEmitter = require('events').EventEmitter;
const util = require('util');

const async = require('async');
const objectAssign = require('object-assign');
const debug=require('debug')('foster');

/**
 * Foster Constructor
 * @param {object} options
 * @param {function} options.log
 */
let Foster = module.exports = function (options){

  EventEmitter.call(this);
  if(!(this instanceof Foster)){
    return new Foster(options);
  }
  this.options = objectAssign({}, options);
  this.log = this.options.log || function () { };

}

module.exports = {

  new:function createObj(options) {
    return new Foster(options);
  }
}

// EventEmitter inheritance
Foster.prototype = Object.create(EventEmitter.prototype);

/**
 * @param {function} functionToExecute
 * @param {object} options
 * @param {function} callback
 */

Foster.prototype.execute = function ( functionToExecute , options , callback ) {

  debug('Fostering');
  if(typeof options === 'function'){
    callback=options;
    options= null;
  }
  options = objectAssign({}, options);
  let type=options.type || 'promise'
  let self=this;

  return new Promise(function(resolve, reject) {


  });

};

Foster.prototype.validate = function (fields) {
  this.log(fields);
  this.emit('valid',fields);
  //console.log(fields);
};

//ERR MNG
function FosterError(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = (message || '');
}
util.inherits(FosterError, Error);
