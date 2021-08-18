// // http://localhost:3001/API/ => URL pour afficher tout  les film 
// app.get("/API", function(req, res){
//   let request = new sql.Request(dbConnect);
//   request.query("SELECT TOP(100) * from Movie  ",            
//    function(err, result){ res.send(result.recordset) })

// })

// //  http://localhost:3001/API/all => URL pour afficher tout titre 
// app.get("/API/titre", function(req, res){
//   let request = new sql.Request(dbConnect);
//   request.query("SELECT title from Movie", function(err, result){ res.send(result) })

// })


// //http://localhost:3001/API/genre => URL pour afficher les Genre des film
// app.get("/API/genre", function(req, res){
//     let request = new sql.Request(dbConnect);
//     request.query("SELECT Label from Genre", function(err, result){ res.send(result.recordset) })

// })

// //http://localhost:3001/API/year => URL pour afficher les date de sortie
// app.get("/API/year", function(req, res){
//   let request = new sql.Request(dbConnect);
//   request.query("SELECT ReleaseDate from Movie", function(err, result){ res.send(result) })

// })
// //http://localhost:3001/API/year/:year => URL pour afficher les date de sortie par filtrage
// app.get("/API/year/:year", function(req, res){
//     let year = Number(req.params.year)
//     let request = new sql.Request(dbConnect);
//     request.query("SELECT ReleaseDate from Movie WHERE year(ReleaseDate) ="+year, function(err, result){ res.send(result) })

// })


// //http://localhost:3001/API/:id => URL pour afficher les ID
// app.get("/API/:id", function(req, res){
//     let id = Number(req.params.id)
//     let request = new sql.Request(dbConnect);
//     request.query("SELECT TOP(100)IdMovie from Movie", function(err, result){ res.send(result.recordset) })

// })
