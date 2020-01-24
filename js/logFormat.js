const get = require('lodash.get'),
	pad = s => (new String(s)).padStart(2, '0')

module.exports = (message, object, level, depth, err, proc) => {
	var log = (ts => `${ts.getUTCFullYear()}-${pad(ts.getUTCMonth() + 1)}-${pad(ts.getUTCDate())}T${pad(ts.getUTCHours())}:${pad(ts.getUTCMinutes())}:${pad(ts.getUTCSeconds())}+0000  `)(new Date()),
		memory = proc && typeof proc.memoryUsage === 'function' ? proc.memoryUsage() : undefined,
		component,
		fileline,
		matches

	if (err && err.stack) {
		var errorLine = err.stack.substring(0, 500).split(/\r\n|\n/)[depth]
		errorLine && (matches = errorLine.match(/\/node_modules\/([^/]+\/[^/]+)\/([^)]+)\)/))
		component = get(matches, 1)
		get(matches, 2) && (fileline = matches[2].match(/\/([^/]+:[0-9]+):[0-9]+$/))
	}

	log += component ? component + ' ' : '- '
	log += '[,,' + get(memory, 'rss', '') + '] '
	log += level + ' '
	log += get(fileline, 1) ? '[' + fileline[1] + '] ' : '[] '

	if (typeof message != 'string') {
		try {
			log += JSON.stringify(message)
		} catch (err) {
			log += message+' '+err
		}
	} else {
		log += message
	}
	try {
		log += object ? JSON.stringify(object) : ''
	} catch (err) {
		log += object + ' ' + err
	}
	log += '\n'

	return log
}
