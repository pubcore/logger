
'use strict'
const fs = require('fs'),
	{notEqual} = require('assert'),
	logFormat = require('../js/logFormat'),
	proc = {
		memoryUsage: process.memoryUsage,
		pid: 2,
		cwd: () => '/home/node/app'
	},
	Error1 = {
		stack: fs.readFileSync('./test/Error1', 'utf8')
	},
	Error2 = {
		stack: fs.readFileSync('./test/Error2', 'utf8')
	},
	Error3 = {
		stack: fs.readFileSync('./test/Error3', 'utf8')
	}

describe('log format', () => {
	it('gets formatted log string', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', Error1, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:24\] test \{test:'test'\}\n$/
		), null)
	})
	it('gets formatted log string from Error2', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', Error2, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:68\] test \{test:'test'\}\n$/
		), null)
	})
	it('gets formatted log string from Eror3', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', Error3, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:20\] test \{test:'test'\}\n$/
		), null)
	})
	it('gets formatted log string - init component', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', Error1, proc, {component:'@init/component'})
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@init\/component \[2,,[0-9]+\] DEBUG \[do.js:24\] test \{test:'test'\}\n$/
		), null)
	})
	it('gets formatted log string with converted object to string message', () => {
		var logFormatted = logFormat({message:'message'}, {object:'object'}, 'DEBUG',  Error1, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:24\] \{"message":"message"\}\{"object":"object"\}\n$/
		), null)
	})
	it('gets formatted log string with converted string object to string message', () => {
		var logFormatted = logFormat({message:'message'}, '{"object":"object"}', 'DEBUG',  Error1, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:24\] \{"message":"message"\}"{\\"object\\":\\"object\\"\}"\n$/
		), null)
	})
	it('gets formatted log string with converted stack trace, if message is an exception', () => {
		var logFormatted = logFormat(new TypeError(), undefined, 'DEBUG',  Error1, proc)
		notEqual(logFormatted.match(/TypeError.+at Context/g), null)
	})
	it('gets formatted log string without Error', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG')
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] DEBUG \[-:0\] test \{test:'test'\}\n$/
			), null)
	})
	it('gets formatted log string without wrong Error object', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG',  {stack: 'Error '}, proc)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[2,,[0-9]+\] DEBUG \[-:0\] test \{test:'test'\}\n$/
			), null)
	})
	it('no exception, gets min line on wrong use', () => {
		var logFormatted = logFormat()
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] undefined \[-:0\] undefined\n$/
			), null)
	})
	it('do not throw exception on circular json parsing', () => {
		var b = {foo: {bar: null}}
		b.foo.bar = b
		var logFormatted = logFormat(b)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] undefined \[-:0\] \[object Object\] TypeError: Converting circular structure to JSON\n/
			), null)
	})
	it('do not throw exception on circular json parsing in object param', () => {
		var b = {foo: {bar: null}}
		b.foo.bar = b
		var logFormatted = logFormat('m',b)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] undefined \[-:0\] m\[object Object\] TypeError: Converting circular structure to JSON\n/
			), null)
	})
})
