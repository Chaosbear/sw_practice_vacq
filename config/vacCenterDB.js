const mysql = require('mysql')

var connection = mysql.createPool({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '12345678',
  database: 'vacCenter'
})

module.exports = connection