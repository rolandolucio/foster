# Foster

## Install

```
npm install foster

```
## Usage

```js

'use strict';

const Foster= require('foster');

let f1= new Foster();
let f2= Foster.new();

class FosterChild extends Foster{}

let f3=new FosterChild();

function testFuncCb (foo,cb){
  //console.log('testFuncCb');
  if(foo=='bar'){
    cb(null,foo);
  }
  cb(foo);
}


f1.cbToPromise(testFuncCb,'foo')
.then((val)=>{
  console.log('P ok');
  console.log(val)
  console.log('==============');
}).catch((e)=>{
  console.log('p F');
  console.error(e);
});

f2.cbToPromise(testFuncCb,'bar')
.then((val)=>{
  console.log('P ok');
  console.log(val)
  console.log('==============');
}).catch((e)=>{
  console.log('p F');
  console.error(e);
});

```
