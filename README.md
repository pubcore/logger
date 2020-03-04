## simple log to stdout

## install
npm i --save @pubcore/logger

## examples
```
const {info} = require('@pubcore/logger')
var x = {foo:'bar'}
info('X=', x)
//will produce this output to stdout:
2020-01-24T20:25:05+0000 @myScope/package [1536,,41930752] INFO [] X={"foo":"bar"}
//     timestamp              component      [pid.,,.memory.] level
```
configuration example
```
// log.js
const {log} = require('@pubcore/logger')
module.exports = log({component:'@initScope/init-package'})
```
```
// use configured logger somewhere in the project
const {debug} = require('./log')
debug('test log')
2020-01-24T20:25:05+0000 @initScope/init-package [1536,,41930752] DEBUG [] X={"foo":"bar"}
```


## available log level
var {debug, info, notice, warning, error, emergency} = require('@pubcore/logger')
