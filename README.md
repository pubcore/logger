## simple log to stdout

## install
npm i --save @pubcore/logger

## example
```
const {info} = require('@pubcore/logger')
var x = {foo:'bar'}
info('X=', x)
//will produce this output to stdout:
2020-01-24T20:25:05+0000 @myScope/package [,,41930752] INFO [] X={"foo":"bar"}
```

## available log level
var {debug, info, notice, warning, error, emergency} = require('@pubcore/logger')