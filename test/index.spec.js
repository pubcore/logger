'use strict'
const exec = require('child_process').execSync,
	{notEqual} = require('assert')

describe('log.[level](message)', () => {
	it('goes threw all logs', () => {
		var logFormatted = exec('node server',{cwd: process.cwd()+'/test-component', encoding:'utf8'})
		notEqual(logFormatted.match(
			/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@scope\/component \[[0-9]+,,[0-9]+\] DEBUG \[index.js:6\] execute lib\n[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}configuredComponent \[[0-9]+,,[0-9]+\] INFO \[index.js:7\] execute lib\n[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\+0000 {2}@scope\/component \[[0-9]+,,[0-9]+\] DEBUG \[index.js:3\] lib\n$/
		), null)
	})
})
