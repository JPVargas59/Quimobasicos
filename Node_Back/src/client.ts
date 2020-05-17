const Client = require('serverless-mysql');
var client = Client({
	config: {
		host: 'localhost',
		port: '3306',
		database: 'quimobasicos',
		user: 'root',
		password: ''
	}
});

export default client;
