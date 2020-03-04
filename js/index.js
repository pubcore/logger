const	logFormat = require('./logFormat'),
	log = (level,config={}) => (message, object) => {
		return process.stdout.write(
			logFormat(message, object, level, new Error(), process, config)
		)
	}

module.exports = {
	debug: log('DEBUG'),
	info: log('INFO'),
	notice: log('NOTICE'),
	warning: log('WARNING'),
	error: log('ERROR'),
	emergency: log('EMERGENCY'),
	log: (config) => ({
		debug: log('DEBUG',config),
		info: log('INFO',config),
		notice: log('NOTICE',config),
		warning: log('WARNING',config),
		error: log('ERROR',config),
		emergency: log('EMERGENCY',config)
	})
}
