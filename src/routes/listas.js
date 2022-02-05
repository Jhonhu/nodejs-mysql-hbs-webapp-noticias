const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    const listas = await pool.query('SELECT noticias.id, title, description, imagenes, categoria FROM noticias, categorias WHERE noticias.categorias_id=categorias.id ORDER BY noticias.created_at');
    res.render('listas/listas', { listas });
    console.log(listas);
});

router.get('/descriptions/:id', async (req, res) => {
    const { id } = req.params;
    const explicits = await pool.query('SELECT noticias.id, title, description, imagenes, categoria FROM noticias, categorias WHERE noticias.categorias_id=categorias.id AND noticias.id= ?  ORDER BY noticias.created_at', [id]);
    console.log(explicits);
    //res.render('listas/desc.hbs' );
    res.render('listas/desc.hbs' , {explicit: explicits[0]});
});

module.exports = router;