const { Artista, Discos, Genero } = require('../../models');
const { Op } = require('sequelize');

const listArtistas = async (req, res) => {
  try {
    const artistas = await Artista.findAll({ include: [Discos, Genero] });
    res.render('artists', { artistas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar artistas');
  }
};

const addArtistaForm = async (req, res) => {
    try {
        const { query } = req.query || {}; 
        let discos = [];

        if (query) {
            discos = await Discos.findAll({
                where: {
                    titulo: {
                        [Op.like]: `%${query}%`
                    }
                },
                attributes: ['id', 'titulo', 'ano'] 
            });
        } else {
            discos = await Discos.findAll({
                attributes: ['id', 'titulo', 'ano']
            });
        }

        const generos = await Genero.findAll({
            attributes: ['id', 'nome'] 
        });

        res.render('addArtist', { discos, generos });
    } catch (error) {
        console.error('Erro ao carregar a página de adicionar artista:', error);
        res.status(500).send('Erro ao carregar a página de adicionar artista.');
    }
};

const addArtista = async (req, res) => {
    try {
      console.log(req.body); 
  
      const { nome, genero, discos, foto } = req.body;
      const novoArtista = await Artista.create({ nome, genero, foto }); 
  
      if (discos) {
        const discosAssociados = Array.isArray(discos) ? discos : [discos];
        const discosEncontrados = await Discos.findAll({
          where: { id: discosAssociados },
        });
        await novoArtista.addDiscos(discosEncontrados);
      }

      const generoEncontrado = await Genero.findOne({ where: { nome: genero } });
      if (generoEncontrado) {
      await novoArtista.addGenero(generoEncontrado);
    }
  
      res.redirect('/artists');
    } catch (error) {
      console.error('Erro ao adicionar artista:', error);
      res.status(500).send('Erro ao adicionar artista');
    }
  };

  const deleteArtista = async (req, res) => {
    try {
        const { id } = req.params;

        const artista = await Artista.findByPk(id);

        if (!artista) {
            return res.status(404).send('Artista não encontrado');
        }

        await artista.destroy(); 
        res.redirect('/artists'); 
    } catch (error) {
        console.error('Erro ao deletar artista:', error);
        res.status(500).send('Erro ao deletar artista');
    }
};

  const editArtistaForm = async (req, res) => {
    try {
      const { id } = req.params;
      const artista = await Artista.findByPk(id, { include: Discos });
      const discos = await Discos.findAll(); 
  
      if (!artista) {
        return res.status(404).send('Artista não encontrado');
      }
  
      res.render('editArtist', { artista, discos });
    } catch (error) {
      console.error('Erro ao carregar formulário de edição de artista:', error);
      res.status(500).send('Erro ao carregar formulário de edição de artista');
    }
  };
  
  const editArtista = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, genero, foto, discos } = req.body;
  
      const artista = await Artista.findByPk(id);
  
      if (!artista) {
        return res.status(404).send('Artista não encontrado');
      }
  
      await artista.update({
        nome,
        genero,
        foto,
      });
  
      if (discos) {
        const discosAssociados = Array.isArray(discos) ? discos : [discos];
        const discosEncontrados = await Discos.findAll({
          where: { id: discosAssociados },
        });
        await artista.setDiscos(discosEncontrados);
      }
  
      res.redirect('/artists');
    } catch (error) {
      console.error('Erro ao editar artista:', error);
      res.status(500).send('Erro ao editar artista');
    }
  };
  

module.exports = { listArtistas, addArtista, addArtistaForm, deleteArtista, editArtistaForm, editArtista };
