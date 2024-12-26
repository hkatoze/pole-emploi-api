const { Sequelize, DataTypes } = require("sequelize");

const JobModel = require("./models/Job");
const AdminModel = require("./models/Admin");

const sequelize = new Sequelize(
  "u235953842_pole_emploi",
  "u235953842_hkatoze_emploi",
  "Kind@1404",
  {
    host: "srv1301.hstgr.io",
    dialect: "mysql",
    dialectOptions: {},
    logging: false,
  }
);
const Admin = AdminModel(sequelize, DataTypes);
const Job = JobModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync().then(() => {
    console.log(`La base de données a bien été initialisée !`);
  });
};

module.exports = {
  initDb,
  Job,
  Admin,
};
