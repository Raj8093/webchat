import pg from 'pg'
const { Pool } = pg

const client = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'weconectdb',
    password: '12345',
    port: 5432, // Default PostgreSQL port
});

export {client}