const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    const listas = await pool.query('SELECT noticias.id, title, description, imagenes, categoria FROM noticias, categorias WHERE noticias.categorias_id=categorias.id ORDER BY noticias.created_at');
    console.log(listas);
    res.render('index', { listas });
});


//SELECT  FROM links, categorias WHERE links.categorias_id=categorias.id
//SELECT id, title, url, description, categoria FROM links, categorias WHERE links.categorias_id=categorias.id
//SELECT links.id, title, url, description, categoria FROM links, categorias WHERE links.categorias_id=categorias.id
//SELECT links.id, title, url, description, categoria FROM links, categorias WHERE links.categorias_id=categorias.id ORDER BY links.created_at
/*router.get('/', async (req, res) => {
    res.render('index');
});*/

module.exports = router;