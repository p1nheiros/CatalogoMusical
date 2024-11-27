const express = require('express');
const router = express.Router();
const { listGeneros, addGenero } = require('../controllers/genreController');

router.get('/', listGeneros); 
router.post('/add', addGenero);

module.exports = router;
