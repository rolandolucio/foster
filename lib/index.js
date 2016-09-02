'use strict';

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

module.exports.new= function createObj(options) {
    return new Foster(options);

}



// EventEmitter inheritance
Foster.prototype = Object.create(EventEmitter.prototype);

/**
 * @param {function} functionToExecute
 * @param {object} options
 * @param {function} callback
 */
Foster.prototype.cbToPromise= function( func ){
  debug('cbToPromise');
  const n=arguments.length;
  if(n<1 || typeof func != 'function' ){
    throw new FosterError('Function to Foster is Required')
  }
  let self=this;

  //Dont leak or pass for optimization
  let args = new Array(n);
  for(let i = 0; i < n; ++i) {
      args[i] = arguments[i];
  }
  args = Array.prototype.slice.call(arguments, 1);

  return new Promise(function(resolve, reject) {

    debug('Making a promise');

    args.push(function(err,res){

      if(err){
        self.log(err);
        return reject(err);
      }
      self.log(res);
      return resolve(res);

    })
    func.apply(func,args);

  });

};



//ERR MNG
function FosterError(message) {

  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = (message || '');
}
util.inherits(FosterError, Error);
