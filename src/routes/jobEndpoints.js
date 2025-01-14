const { Job } = require("../db/sequelize");
const { ValidationError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  // Créer une offre d'emploi
  app.post("/api/jobs", auth, (req, res) => {
    Job.create(req.body)
      .then((job) => {
        const message = "Nouvelle offre d'emploi ajoutée avec succès.";
        res.json({ message, data: job });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message });
        }
        const message =
          "L'offre d'emploi n'a pas pu être créée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Modifier une offre d'emploi
  app.put("/api/jobs/:id", auth, (req, res) => {
    const id = req.params.id;

    Job.update(req.body, { where: { id } })
      .then(([updated]) => {
        if (!updated) {
          return res
            .status(404)
            .json({ message: "L'offre d'emploi n'a pas été trouvée." });
        }

        return Job.findByPk(id).then((job) => {
          const message = "Offre d'emploi modifiée avec succès.";
          res.json({ message, data: job });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          console.log(`${error}`);
          return res.status(400).json({ message: error });
        }
        const message =
          "L'offre d'emploi n'a pas pu être modifiée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Supprimer une offre d'emploi
  app.delete("/api/jobs/:id", auth, (req, res) => {
    const id = req.params.id;

    Job.findByPk(id)
      .then((job) => {
        if (!job) {
          return res
            .status(404)
            .json({ message: "L'offre d'emploi n'a pas été trouvée." });
        }

        return Job.destroy({ where: { id } }).then(() => {
          const message = "Offre d'emploi supprimée avec succès.";
          res.json({ message });
        });
      })
      .catch((error) => {
        const message =
          "L'offre d'emploi n'a pas pu être supprimée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupérer une offre d'emploi par ID
  app.get("/api/jobs/:id", auth, (req, res) => {
    const id = req.params.id;

    Job.findByPk(id)
      .then((job) => {
        if (!job) {
          return res
            .status(404)
            .json({ message: "L'offre d'emploi n'a pas été trouvée." });
        }

        const message = "Offre d'emploi récupérée avec succès.";
        res.json({ message, data: job });
      })
      .catch((error) => {
        const message =
          "L'offre d'emploi n'a pas pu être récupérée. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupérer toutes les offres d'emploi
  app.get("/api/jobs", auth, (req, res) => {
    Job.findAll()
      .then((jobs) => {
        const message = "Liste des offres d'emploi récupérée avec succès.";
        res.json({ message, data: jobs });
      })
      .catch((error) => {
        const message =
          "Les offres d'emploi n'ont pas pu être récupérées. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });

  // Récupérer toutes les offres d'emploi d'une catégorie
  app.get("/api/jobs/category/:category", auth, (req, res) => {
    const category = req.params.category;

    Job.findAll({ where: { category } })
      .then((jobs) => {
        if (jobs.length === 0) {
          return res.status(404).json({
            message: `Aucune offre trouvée pour la catégorie ${category}.`,
          });
        }

        const message = `Offres d'emploi pour la catégorie ${category} récupérées avec succès.`;
        res.json({ message, data: jobs });
      })
      .catch((error) => {
        const message =
          "Les offres d'emploi n'ont pas pu être récupérées. Réessayez dans quelques instants.";
        res.status(500).json({ message, data: error });
      });
  });
};
