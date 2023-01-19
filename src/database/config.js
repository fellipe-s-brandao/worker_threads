const knex = require('knex');

const connection = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'teste',
        password: 'teste123',
        database: 'paralelismo'
    },
    pool: {
        min: 2,
        max: 10
    },
});

module.exports = { connection };