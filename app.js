const bodyParser = require("body-parser");
const express = require("express");
const { initDb } = require("./src/db/sequelize");
const cors = require("cors");
const cron = require("node-cron");
const updateExpiredSubscriptions = require("./src/utilsFunctions/updateExpiredSubscriptionPlan");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()).use(cors());
app.use((req, res, next) => {
  console.log(`Requête reçue: ${req.method} ${req.url}`);
  next();
});
initDb();

/* ........All routes list........... */
require("./src/routes/adminEndpoints")(app);
require("./src/routes/jobEndpoints")(app);
require("./src/routes/pubEndpoints")(app);
require("./src/routes/uploadFileOnFirebase")(app);

// Configurer le Cron Job pour s'exécuter tous les jours à minuit
cron.schedule("0 0 * * *", updateExpiredSubscriptions);

//404 error managment
app.use(({ res }) => {
  const message = `Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.`;
  res?.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre api a démaré sur : http://localhost:${port}`);
});

module.exports = app;
