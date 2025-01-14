module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define("Job", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mailAdressToApply: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    companyDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessibility: {
      type: DataTypes.ENUM("LIBRE", "PAYANT"),
      allowNull: true,
    },
  });

  return Job;
};
