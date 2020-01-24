
'use strict'
const log = require('../js/index')

describe('log.[level](message)', () => {
	it('goes threw all logs', () => {
		log.debug('m')
		log.info('m')
		log.notice('m')
		log.warning('m')
		log.error('m')
		log.emergency('m', {foo:'bar'})
	})
})
