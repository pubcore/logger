const {ok} = require('assert'),
	main = require('../js/index')

describe('my module', ()=>{
	it('exports an object', () =>{
		ok(typeof main === 'object')
	})
})