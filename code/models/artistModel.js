module.exports = (sequelize, DataTypes) => {
  const Artista = sequelize.define(
    'Artista',
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discos: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'Artistas',
    }
  );

  Artista.associate = (models) => {
    Artista.belongsToMany(models.Genero, {
      through: 'ArtistaGeneros', 
      foreignKey: 'ArtistaId',  
      otherKey: 'GeneroId',  
    });
  
    Artista.belongsToMany(models.Discos, {
      through: 'ArtistaDiscos', 
      foreignKey: 'ArtistaId',
      otherKey: 'DiscoId',   
    });
  };
  

  return Artista;
};
