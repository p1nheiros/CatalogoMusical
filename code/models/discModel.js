module.exports = (sequelize, DataTypes) => {
    const Discos = sequelize.define('Discos', {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      capa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      faixas: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    
    Discos.associate = (models) => {
        Discos.belongsToMany(models.Genero, {
          through: 'DiscoGeneros',
          foreignKey: 'DiscoId', 
          otherKey: 'GeneroId',
        });
    
         Discos.belongsToMany(models.Artista, {
          through: 'ArtistaDiscos', 
          foreignKey: 'DiscoId', 
          otherKey: 'ArtistaId',
        });
    };
       
      
    return Discos;
  };

  