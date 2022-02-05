const express = require('express');
const router = express.Router();

const pool = require('../database');

/*router.get('/', async (req, res) => {
    const listas = await pool.query('SELECT * FROM links');
    res.render('listas/listas', { listas });
});*/

/*router.get('/', async (req, res) => {
    res.render('description/desc.hbs');
});*/

router.get('/descriptions/:id', async (req, res) => {
    const { id } = req.params;
    const explicits = await pool.query('SELECT * FROM noticias WHERE id = ?', [id]);
    console.log(explicits);
    res.render('description/desc.hbs');
    //res.render('descrption/desc.hbs' , {explicit: explicits[0]});
});

module.exports = router;