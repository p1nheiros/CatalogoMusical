const express = require('express');
const router = express.Router();
const { listDiscos, addDisco, searchDiscos, addDiscForm, deleteDisco, editDiscoForm, editDisco } = require('../controllers/discController');

router.get('/', listDiscos);
router.get('/search', searchDiscos);
router.post('/add', addDisco);
router.get('/add', addDiscForm);
router.post('/delete/:id', deleteDisco);
router.get('/edit/:id', editDiscoForm); 
router.post('/edit/:id', editDisco); 

module.exports = router;
