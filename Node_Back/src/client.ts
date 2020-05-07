const Client = require('serverless-mysql');
var client = Client({
	config: {
		host: process.env.DBHOST,
		port: process.env.DBPORT,
		database: process.env.DBSCHEMA,
		user: process.env.DBUSER,
		password: process.env.DBPASSWORD
	}
});

export default client;
