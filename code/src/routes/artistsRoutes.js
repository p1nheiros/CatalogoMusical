const express = require('express');
const router = express.Router();
const { listArtistas, addArtista, addArtistaForm, deleteArtista, editArtistaForm, editArtista } = require('../controllers/artistController');

router.get('/', listArtistas);
router.get('/add', addArtistaForm);
router.post('/add', addArtista);
router.post('/delete/:id', deleteArtista);
router.get('/edit/:id', editArtistaForm); 
router.post('/edit/:id', editArtista);    

module.exports = router;
