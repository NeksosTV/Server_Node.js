// lcharger notre nouvelle route brillante pour les utilisateurs
const userRoutes = require('./users');

const appRouter = (app, fs) => {
  // nous avons ajouté un itinéraire par défaut qui gère les itinéraires vides
  // à l’url de l’API de base
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // exécuter notre module d’acheminement des utilisateurs ici pour terminer le câblage
  userRoutes(app, fs);
};

// cette ligne est inchangée
module.exports = appRouter;