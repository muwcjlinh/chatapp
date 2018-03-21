var init = function () {

	if(process.env.NODE_ENV === 'production') {
		return {
			db: {
				host: process.env.dbHost,
				port: process.env.dbPort,
				name: process.env.dbName
			},
			sessionSecret: process.env.sessionSecret
		}
	}
	else {
		return require('./config.json');
	}
}

module.exports = init();