import express from 'express';
import { config } from 'dotenv';
import pg from 'pg';
import router from './router.js';
import cors from 'cors';

config();

const app = express();

app.use(cors());

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.SSL_ENABLED === 'true' ? true : false
});

app.use(express.json());

app.use('/', router);
app.use('/ping', router);
app.use('/todos', router);

app.listen(4000);
console.log('Server on port ', 4000);

export default pool;