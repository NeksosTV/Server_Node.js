let sql = require("mssql/msnodesqlv8")
let dbConfig = require("./dbConfig")
let dbConnect = new sql.connect(dbConfig,
  function(err)
   {
     if(err){
       console.log("Erreur lors de la connexion de la base de données : " + err)
     }else{
       console.log("Bien joué vous êtes connecté à la base de données : " + dbConfig.server)
     }
   }
)

module.exports = dbConnect