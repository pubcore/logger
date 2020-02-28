
'use strict'
const {notEqual} = require('assert'),
	logFormat = require('../js/logFormat'),
	proc = {
		env: {
			PWD: '/h/n/a/node_modules/@a/unittest',
			npm_package_name: '@a/unittest'
		},
		memoryUsage: process.memoryUsage,
		pid: 2
	},
	Error = {
		stack: 'Error\n    at format (/h/n/a/node_modules/@a/unittest/node_modules/@b/dep_comp/js/action/do.js:24:14)\n    at'
	}

describe('log format', () => {
	it('gets formatted log string', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', 1, Error, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:24\] test \{test:'test'\}\n$/
		), null)
	})
	it('gets formatted log string with converted object to string message', () => {
		var logFormatted = logFormat({message:'message'}, {object:'object'}, 'DEBUG', 1, Error, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:24\] \{"message":"message"\}\{"object":"object"\}\n$/
		), null)
	})
	it('gets formatted log string with converted string object to string message', () => {
		var logFormatted = logFormat({message:'message'}, '{"object":"object"}', 'DEBUG', 1, Error, proc)
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@a\/unittest \[2,,[0-9]+\] DEBUG \[do.js:24\] \{"message":"message"\}"{\\"object\\":\\"object\\"\}"\n$/
		), null)
	})
	it('gets formatted log string with converted stack trace, if message is an exception', () => {
		var logFormatted = logFormat(new TypeError(), undefined, 'DEBUG', 1, Error, proc)
		notEqual(logFormatted.match(/TypeError.+at Context/g), null)
	})
	it('gets formatted log string without Error', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', 1)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] DEBUG \[\] test \{test:'test'\}\n$/
			), null)
	})
	it('gets formatted log string without wrong Error object', () => {
		var logFormatted = logFormat('test {test:\'test\'}', null, 'DEBUG', 1, {stack: 'Error '}, proc)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[2,,[0-9]+\] DEBUG \[\] test \{test:'test'\}\n$/
			), null)
	})
	it('no exception, gets min line on wrong use', () => {
		var logFormatted = logFormat()
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] undefined \[\] undefined\n$/
			), null)
	})
	it('do not throw exception on circular json parsing', () => {
		var b = {foo: {bar: null}}
		b.foo.bar = b
		var logFormatted = logFormat(b)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] undefined \[\] \[object Object\] TypeError: Converting circular structure to JSON\n/
			), null)
	})
	it('do not throw exception on circular json parsing in object param', () => {
		var b = {foo: {bar: null}}
		b.foo.bar = b
		var logFormatted = logFormat('m',b)
		notEqual(
			logFormatted.match(
				/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}- \[,,\] undefined \[\] m\[object Object\] TypeError: Converting circular structure to JSON\n/
			), null)
	})
})
