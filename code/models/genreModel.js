module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define(
    'Genero',
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Generos',
    }
  );
  Genero.associate = (models) => {
    Genero.belongsToMany(models.Artista, {
      through: 'ArtistaGeneros', 
      foreignKey: 'GeneroId',    
      otherKey: 'ArtistaId',   
    });
  
    Genero.belongsToMany(models.Discos, {
      through: 'DiscoGeneros', 
      foreignKey: 'GeneroId',    
      otherKey: 'DiscoId',     
    });
  };
  

  return Genero;
};
