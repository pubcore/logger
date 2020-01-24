const	logFormat = require('./logFormat'),
	log = (level, err) => (message, object) => process.stdout.write(
		logFormat(message, object, level, 2, err, process)
	)

module.exports = {
	debug: log('DEBUG', new Error()),
	info: log('INFO', new Error()),
	notice: log('NOTICE', new Error()),
	warning: log('WARNING', new Error()),
	error: log('ERROR', new Error()),
	emergency: log('EMERGENCY', new Error())
}
