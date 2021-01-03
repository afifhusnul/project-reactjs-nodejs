const moment = require('moment');
const types = require('pg').types;

const DATE_OID = 1082;
const parseDate = (value) => value;

types.setTypeParser(DATE_OID, parseDate);



module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/random_test',
    charset  : 'utf8'
  },
  test: {
    client: 'pg',
    connection: 'postgres://postgres:postgres@localhost:5432/random_test',
    charset  : 'utf8'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    charset  : 'utf8'
  },
  pool: {
    min: 2,
    max: 10,
    acquireConnectionTimeout: 10000,
    afterCreate: function(connection, callback) {
      connection.query('SET timezone="UTC";', error => {
        if (error) {
          console.log(error)
        } else {
          callback(error, connection);
        }

      })
      
    }
  }
};
