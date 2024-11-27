const { Discos, Artista, Genero } = require('../../models');
const { Op } = require('sequelize');

const listDiscos = async (req, res) => {
    try {
      const discos = await Discos.findAll({
        include: [
          {
            model: Genero, 
            required: false, 
          },
          {
            model: Artista, 
            required: false,
          },
        ],
      });
  
      res.render('discs', { discos });
    } catch (error) {
      console.error('Erro ao buscar discos:', error);
      res.status(500).send('Erro ao carregar discos.');
    }
  };

  const addDiscForm = async (req, res) => {
    try {
      const generos = await Genero.findAll({
        attributes: ['id', 'nome'], 
      });
  
      res.render('addDisc', { generos }); 
    } catch (error) {
      console.error('Erro ao carregar a página de cadastro de disco:', error);
      res.status(500).send('Erro ao carregar a página de cadastro de disco.');
    }
  };
  
  const addDisco = async (req, res) => {
    try {
      const { titulo, ano, capa, faixas, genero } = req.body;
  
      const novoDisco = await Discos.create({
        titulo,
        ano,
        capa,
        faixas: faixas.split(',').map(faixa => faixa.trim()), 
      });

      if (genero) {
        const generoEncontrado = await Genero.findOne({ where: { nome: genero } });
        if (generoEncontrado) {
          await novoDisco.addGenero(generoEncontrado);
        }
      }
  
      res.redirect('/discs');
    } catch (error) {
      console.error('Erro ao cadastrar o disco:', error);
      res.status(500).send('Erro ao cadastrar o disco.');
    }
  };

const searchDiscos = async (req, res) => {
  try {
    const { titulo, artista, genero } = req.query;
    const whereConditions = {};

    if (titulo) whereConditions.titulo = { [Op.iLike]: `%${titulo}%` };
    if (genero) whereConditions['$Generos.nome$'] = { [Op.iLike]: `%${genero}%` };

    const discos = await Discos.findAll({
      where: whereConditions,
      include: [
        {
          model: Artista,
          where: artista ? { nome: { [Op.iLike]: `%${artista}%` } } : {},
          required: false,
        },
        { model: Genero, required: false },
      ],
    });

    res.render('discs', { discos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar discos');
  }
};

const deleteDisco = async (req, res) => {
    try {
      const { id } = req.params;
      await Discos.destroy({ where: { id } });
      res.redirect('/discs');
    } catch (error) {
      console.error('Erro ao excluir disco:', error);
      res.status(500).send('Erro ao excluir disco');
    }
  };

  const editDiscoForm = async (req, res) => {
    try {
      const { id } = req.params;
      const disco = await Discos.findByPk(id, { include: Genero });
      const generos = await Genero.findAll();
  
      if (!disco) {
        return res.status(404).send('Disco não encontrado');
      }
  
      res.render('editDisc', { disco, generos });
    } catch (error) {
      console.error('Erro ao carregar formulário de edição de disco:', error);
      res.status(500).send('Erro ao carregar formulário de edição de disco');
    }
  };

  const editDisco = async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, ano, capa, faixas, genero } = req.body;
  
      const disco = await Discos.findByPk(id);
  
      if (!disco) {
        return res.status(404).send('Disco não encontrado');
      }
  
      await disco.update({
        titulo,
        ano,
        capa,
        faixas: faixas.split(',').map(f => f.trim()),
        GeneroId: genero,
      });
  
      res.redirect('/discs');
    } catch (error) {
      console.error('Erro ao editar disco:', error);
      res.status(500).send('Erro ao editar disco');
    }
  };
  

module.exports = { listDiscos, addDisco, searchDiscos, addDiscForm, deleteDisco, editDiscoForm, editDisco };
