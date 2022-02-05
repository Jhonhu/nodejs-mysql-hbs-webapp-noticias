const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', (req, res) => {
    res.render('noticias/add');
});

router.post('/add', async (req, res) => {
    let sampleFile;
    let uploadPath;
    sampleFile = req.files.sampleFile;
    uploadPath = 'src/public/uploads/' + sampleFile.name;
    sampleFile.mv(uploadPath)
    const imagenes = sampleFile.name;
    const { title, description, categorias_id } = req.body;
    const newNews = {
        title,
        description,
        categorias_id,
        imagenes,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO noticias set ?', [newNews]);
    req.flash('success', 'Noticia Guardada');
    res.redirect('/noticias');
});

router.get('/', isLoggedIn, async (req, res) => {
    const noticias = await pool.query('SELECT * FROM noticias WHERE user_id = ?', [req.user.id]);
    res.render('noticias/list', { noticias });
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM noticias WHERE ID = ?', [id]);
    req.flash('success', 'Noticia Eliminada');
    res.redirect('/noticias');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const noticias = await pool.query('SELECT * FROM noticias WHERE id = ?', [id]);
    console.log(noticias);
    res.render('noticias/edit', {noticia: noticias[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    let newFile;
    let uploadPath2;
    newFile = req.files.newFile;
    uploadPath2 = 'src/public/uploads/' + newFile.name;
    newFile.mv(uploadPath2)
    const imagenes = newFile.name;

    const { title, description, categorias_id} = req.body; 
    const newNews = {
        title,
        description,
        categorias_id,
        imagenes
    };
    await pool.query('UPDATE noticias set ? WHERE id = ?', [newNews, id]);
    req.flash('success', 'Noticia Actualizada');
    res.redirect('/noticias');
    
});

module.exports = router;