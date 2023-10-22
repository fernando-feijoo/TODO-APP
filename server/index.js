import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import router from './router.js';

config();

const app = express();
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.SSL_ENABLED === 'true' ? true : false
});


app.use('/', router);
app.use('/ping', router);

app.listen(4000);
console.log('Server on port ', 4000);

export default pool;