const express = require('express');
const path = require('path');
const { Discos } = require('../models'); 
const artistasRoutes = require('./routes/artistsRoutes');
const genresRoutes = require('./routes/genresRoutes');
const discsRoutes = require('./routes/discsRoutes');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/artists', artistasRoutes);
app.use('/discs', discsRoutes);
app.use('/genres', genresRoutes);
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/discs', async (req, res) => {
    try {
        const discos = await Discos.findAll();
        res.render('discs', { discos });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar discos');
    }
});

app.get('/artists', (req, res) => {
    res.render('artists');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
