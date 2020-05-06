const Client = require('serverless-mysql')
var client = Client({
    config: {
        host: '192.168.64.2',
        port: 3306,
        database: 'quimobasicos',
        user: 'xampp',
        password: ''
    }
});

export default client;