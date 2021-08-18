// lcharger notre nouvelle route brillante pour les utilisateurs
const moviesRoutes = require('./movies');
const userRoutes = require('./users');

const appRouter = (app, fs) => {
  // nous avons ajouté un itinéraire par défaut qui gère les itinéraires vides
  // à l’url de l’API de base
  app.get('/', 
  (req, res) => {
      let accueil = { 
        description : "Bienvenue sur l'API NetFlax, vous pourrez accèder aux information des film avec l'URL : http://localhost:3001/",
      route :
      {
        movies: "http://localhost:3001/Movies/",
        "movie-by-id (changer l'id  avec celui du Film souhaité" : "http://localhost:3001/Movies/28",
        "movie-by-trailer" : "http://localhost:3001/Movies/Trailer/",
        "movie-by-title" : "http://localhost:3001/Movies/title",
        "movie-by-genre" : "http://localhost:3001/Movies/genre",
        "movie-by-genre-IdGenre" : "http://localhost:3001/genres",
        "movie-by-acteur" : "http://localhost:3001/Movies/acteur",
        "movie-by-CastMovie" : "http://localhost:3001/Movies/cast/"
      }
     };
     res.send(accueil);
    
  });

  // exécuter notre module d’acheminement des utilisateurs ici pour terminer le câblage
  userRoutes(app, fs);
  moviesRoutes(app)
};

// cette ligne est inchangée
module.exports = appRouter;