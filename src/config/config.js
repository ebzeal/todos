// import fs from 'fs';
// import path from 'path';

module.exports = {
  development: {
    username: 'ebzeal',
    password: '',
    database: 'todos',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'todos_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres'
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(path.join(__dirname, '/mysql-ca-master.crt'))
    //   }
    // }
  }
};
