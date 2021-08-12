// charger le framework express et le body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
let dbConnect = require('./data/dbConnect');
const sql = require("mssql/msnodesqlv8");

// créer une instance d’express pour servir nos points finaux
const app = express();

// nous chargerons la bibliothèque d’aide du système de fichiers intégrée au nœud ici
// (nous l’utiliserons plus tard pour servir nos fichiers JSON
const fs = require('fs');

// configurer notre instance express avec quelques réglages de body-parser
// y compris le traitement des données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// C’est là que nous traiterons nos différents itinéraires à partir de
const routes = require('./routes/routes.js')(app, fs);

// httlhost:3001/API/tp://locaitre => URL pour afficher tout (SELECT * from Movie)
app.get("/API", function(req, res){
  let request = new sql.Request(dbConnect);
  request.query("SELECT * from Movie", function(err, result){ res.send(result) })

})


// httlhost:3001/API/tp://locaitre => URL pour afficher les titre (SELECT Title from Movie)
app.get("/API", function(req, res){
    let request = new sql.Request(dbConnect);
    request.query("SELECT Title from Movie", function(err, result){ res.send(result) })

})

//http://localhost:3001/API/genre => URL pour afficher les date de sortie
app.get("/API/genre", function(req, res){
    let request = new sql.Request(dbConnect);
    request.query("SELECT ReleaseDate from Movie", function(err, result){ res.send(result) })

})



// enfin, lancez notre serveur sur le port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});
