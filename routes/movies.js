const sql = require('mssql/msnodesqlv8')
const dbConnect = require('./../data/dbConnect');
const prefix = '/movies/';

/** Route défini sur http://localhost:3001/Movies/*/
const moviesRoutes = (app) => {
    app.get(`${ prefix}`,
        (req, res) => {
            let request  =new sql.Request(dbConnect)
            request.query('SELECT [IdMovie], [Title], [Picture], [Trailer], [ReleaseDate], [Summary] FROM [Movie]',
                (err, result) => {
                    if(err) console.log(err);
                    else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
                }
            );
        }
    );
// afficher la partie title
    app.get(`${ prefix}title/`,
        (req, res) => {
            let request  =new sql.Request(dbConnect)
            request.query('SELECT TOP(20) [IdMovie], [Title], [Trailer],[Picture] , [Summary] FROM [Movie]',
                (err, result) => {
                    if(err) console.log(err);
                    else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
                }
            );
            
        }
    );

// afficher la partie Trailer
    app.get(`${ prefix}Trailer/`,
    (req, res) => {
        let request  =new sql.Request(dbConnect)
        request.query('SELECT   [Trailer] FROM [Movie]',
            (err, result) => {
                if(err) console.log(err);
                else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
            }
        );
        
    }
);
// afficher la partie Picture
    app.get(`${ prefix}Picture/`,
    (req, res) => {
        let request  =new sql.Request(dbConnect)
        request.query('SELECT   [Picture] FROM [Movie]',
            (err, result) => {
                if(err) console.log(err);
                else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
            }
        );
        
    }
);

// afficher la partie Acteur
app.get(`${ prefix}acteur/`,
(req, res) => {
    let request  =new sql.Request(dbConnect)
    request.query('SELECT [IdCast] ,[FirstName],[LastName] FROM  [Cast]',
        (err, result) => {
            if(err) console.log(err);
            else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
        }
    );
    
}
);




// afficher la partie Genre des film
app.get(`${ prefix}:id/genre`,
(req, res) => {
    const id = parseInt(req.params.id);
    let request  =new sql.Request(dbConnect)
    request.query(`SELECT Genre.IdGenre , Genre.Label FROM  MovieGenre  JOIN Genre ON MovieGenre.IdGenre = Genre.IdGenre WHERE IdMovie =${id}`,
        (err, result) => {
            if(err) console.log(err);
            else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
        }
    );
    
}
);
//---------------------------------------------------------------
// afficher la partie Genre des film
app.get(`${ prefix}cast/:id`,
(req, res) => {
    const id = req.params.id;
    let request  =new sql.Request(dbConnect)
    request.query(`SELECT * FROM Cast WHERE IdCast = ${id}`,
        (err, result) => {
            if(err) console.log(err);
            else res.send(result.recordset[0]);  // .recordset est pour afficher que la partie recordset
        }
    );
    
}
);
//---------------------------------------------------------------



// afficher la partie  genre
app.get(`${ prefix}genre/`,
(req, res) => {
    let request  =new sql.Request(dbConnect)
    request.query('SELECT [Label] FROM [Genre]',
        (err, result) => {
            if(err) console.log(err);
            else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
        }
    );
    
}
);
// afficher la partie  genre
app.get(`${ prefix}genre/movieId/:id`,
(req, res) => {
    let id = req.params.id;
    let request  =new sql.Request(dbConnect)
    request.query(`SELECT Genre.* FROM Genre JOIN MovieGenre ON Genre.IdGenre = MovieGenre.IdGenre WHERE MovieGenre.IdMovie = ${id}`, 
    
        (err, result) => {
            if(err) console.error(err);
            else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
        }
    );
    
}
);

app.get(`${prefix}bygenre/:id`, 
 (req, res) => {
     let id = req.params.id;
     let request = new sql.Request(dbConnect)
     request.query(`SELECT Movie.* FROM Movie JOIN MovieGenre ON Movie.IdMovie = MovieGenre.IdMovie WHERE MovieGenre.IdGenre = ${id}`,
     (err, result) => {
        if(err) console.error(err);
        else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
    })
 }


)      

//------------------------------------------------
//Date

app.get(`${prefix}year/:id`, 
 (req, res) => {
     let id = req.params.id;
     let request = new sql.Request(dbConnect)
     request.query(`SELECT IdMovie, Title FROM movie WHERE year(ReleaseDate)= ${id}`,
     (err, result) => {
        if(err) console.error(err);
        else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
    })
 }


)              
app.get(`${prefix}year`, 
 (req, res) => {
     let request = new sql.Request(dbConnect)
     request.query(`SELECT distinct year(ReleaseDate) as year FROM Movie order by year`,
     (err, result) => {
        if(err) console.error(err);
        else res.send(result.recordset);  // .recordset est pour afficher que la partie recordset
    })
 }


)              


//------------------------------------------------

    //tous les genres
    app.get("/genres", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            "SELECT genre.* FROM Genre",
            function (error, result, fields) {
                result = result.recordset;
                res.send(result);
            });
    })


    // genre par id de film
    app.get("/genres/:id", function (req, res) {
        let request = new sql.Request(dbConnect);
        request.query(
            `SELECT g.*
            From Genre as g
            JOIN MovieGenre as mg ON
            mg.IdGenre = g.IdGenre
            WHERE IdMovie = ${req.params.id}`,
            function (error, result, fields) {
                if (result.length === 0) {
                    result = {
                        response: 'error',
                        error: 'invalid id'
                    }
                } else {
                    result = result.recordset;
                    result = {
                        response: "success",
                        results: result
                    };
                }
                res.send(result);
            });
    });
    
    
// afficher la partie ID
    app.get(`${ prefix}:id`,
    (req, res) => {
        let id = parseInt(req.params.id);
        let request  =new sql.Request(dbConnect)
        request.query(`SELECT [IdMovie], [Title], [Picture], [Trailer], [ReleaseDate], [Summary] FROM [Movie] WHERE [IdMovie] = ${id}`,
            (err, result) => {
                if(err) console.log(err);
                else if(result.recordset.length > 0) res.send(result.recordset[0]);  // .recordset est pour afficher que la partie recordset
                else res.send({error : "Pas d'élèment avec cet identifiant"})
            }
        );
        
    }
);

 // Envoie d'info depuis angular
app.post(`/Genres/`,(req,res)=>{

    let content = req.body;

    console.log(content);

    let request = new sql.Request(dbConnect);

    request.query(`INSERT INTO Genre OUTPUT inserted.IdGenre VALUES('${content.IdGenre}','${content.Label}')`, (err, result)=>{

        if (err) console.error(err);

        else res.send(result.recordset[0]);

    })

});
}




module.exports = moviesRoutes