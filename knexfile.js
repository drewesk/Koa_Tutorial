const path = require('path');

module.exports = {

  test: {
    client: 'pg',
    connection: 'postgresql://localhost/koa_api_test'
  },

  development: {
    client: 'pg',
    connection: 'postgresql://localhost/koa_api'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
