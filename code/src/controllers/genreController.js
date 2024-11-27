const { Genero, Discos, Artista } = require('../../models');

const listGeneros = async (req, res) => {
  try {
    const generos = await Genero.findAll({
      include: [
        {
          model: Discos,
          required: false, 
        },
        {
          model: Artista,
          required: false, 
        },
      ],
    });

    res.render('genres', { generos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar gêneros');
  }
};

const addGenero = async (req, res) => {
    try {
      const { nome } = req.body;
  
      if (!nome) {
        return res.status(400).send('O nome do gênero é obrigatório.');
      }
  
      await Genero.create({ nome });

      res.redirect('/genres');
    } catch (error) {
      console.error('Erro ao adicionar gênero:', error);
      res.status(500).send('Erro ao adicionar gênero');
    }
  };

module.exports = { listGeneros, addGenero };
