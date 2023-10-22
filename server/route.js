import express from 'express';
import pool from './index.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Esta es la página de inicio');
});

router.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
});

export default router;