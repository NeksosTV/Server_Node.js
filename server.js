// charger le framework express et le body-parser helper
const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./data/dbConnect');
const sql = require("mssql/msnodesqlv8");
const cors = require('cors');

// créer une instance d’express pour servir nos points finaux
const app = express();

// nous chargerons la bibliothèque d’aide du système de fichiers intégrée au nœud ici
// (nous l’utiliserons plus tard pour servir nos fichiers JSON
const fs = require('fs');

// configurer notre instance express avec quelques réglages de body-parser
// y compris le traitement des données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// C’est là que nous traiterons nos différents itinéraires à partir de
const routes = require('./routes/routes.js')(app, fs);




// enfin, lancez notre serveur sur le port 3001.
const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
  dbConnect;
});
