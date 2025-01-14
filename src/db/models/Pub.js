module.exports = (sequelize, DataTypes) => {
  const Pub = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pubUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isPrincipalBanner: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  });

  return Pub;
};
