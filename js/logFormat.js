const get = require('lodash.get'),
	pad = s => (new String(s)).padStart(2, '0')

module.exports = (message, object, level, err, proc, config) => {
	var log = (ts => `${ts.getUTCFullYear()}-${pad(ts.getUTCMonth() + 1)}-${pad(ts.getUTCDate())}T${pad(ts.getUTCHours())}:${pad(ts.getUTCMinutes())}:${pad(ts.getUTCSeconds())}+0000  `)(new Date()),
		memory = proc && typeof proc.memoryUsage === 'function' ? proc.memoryUsage() : undefined,
		fileline,
		component = get(config, 'component', '')

	if (err && err.stack) {
		var stackline = get(err.stack.substring(0, 1000).split(/\r\n|\n/), 2, '')
		!component && (
			component = (stackline.match(RegExp(`${proc.cwd()}/node_modules/([^/]+/[^/]+)`, 'i'))||[])[1]
		)
		fileline = (stackline.match(/([^/]+:[0-9]+):[0-9]+\)?$/) || [])[1]
	}

	log += component ? component + ' ' : '- '
	log += '['+get(proc, 'pid', '')+',,' + get(memory, 'rss', '') + '] '
	log += level + ' '
	log += '[' + (fileline||'-:0') + '] '

	if (typeof message != 'string') {
		try {
			log += JSON.stringify(get(message, 'stack', message))
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
