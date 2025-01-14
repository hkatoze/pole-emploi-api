const { Pub } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  // Créer une pubs
  app.post("/api/pubs", auth, (req, res) => {
    Pub.create(req.body)
      .then((job) => {
        const message = "Nouvelle pub ajoutée avec succès.";
        res.json({ message, data: job });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message =
          "La pub n'a pas pu être créée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Modifier une pubs
  app.put("/api/pubs/:id", auth, (req, res) => {
    const id = req.params.id;

    Pub.update(req.body, { where: { id } })
      .then(([updated]) => {
        if (!updated) {
          return res
            .status(404)
            .json({ message: "La pub n'a pas été trouvée." });
        }

        return Pub.findByPk(id).then((job) => {
          const message = "Pub modifiée avec succès.";
          res.json({ message, data: job });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          console.log(`${error}`);
          return res.status(400).json({ message: error });
        }
        const message =
          "La pub n'a pas pu être modifiée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Supprimer une pubs
  app.delete("/api/pubs/:id", auth, (req, res) => {
    const id = req.params.id;

    Pub.findByPk(id)
      .then((job) => {
        if (!job) {
          return res
            .status(404)
            .json({ message: "La pub n'a pas été trouvée." });
        }

        return Pub.destroy({ where: { id } }).then(() => {
          const message = "Pub supprimée avec succès.";
          res.json({ message });
        });
      })
      .catch((error) => {
        const message =
          "La pub n'a pas pu être supprimée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupérer une pubs par ID
  app.get("/api/pubs/:id", auth, (req, res) => {
    const id = req.params.id;

    Pub.findByPk(id)
      .then((job) => {
        if (!job) {
          return res
            .status(404)
            .json({ message: "La pub n'a pas été trouvée." });
        }

        const message = "Pub récupérée avec succès.";
        res.json({ message, data: job });
      })
      .catch((error) => {
        const message =
          "La pub n'a pas pu être récupérée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupérer toutes les offres d'emploi
  app.get("/api/pubs", auth, (req, res) => {
    Pub.findAll()
      .then((jobs) => {
        const message = "Liste des pubs récupérée avec succès.";
        res.json({ message, data: jobs });
      })
      .catch((error) => {
        const message =
          "Les pubs n'ont pas pu être récupérées. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
