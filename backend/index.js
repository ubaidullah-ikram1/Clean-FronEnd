   var express = require('express');
   var bodyParser = require('body-parser');
   var app = express();
   const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'downloadsatelite',
  password: '1234',
  port: 5432,
})

   
  



   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true}));
   app.use(express.json())
   app.post('/', function(req, res){
      pool.query(`INSERT INTO skoopinsert (x1, x2, y1,y2,geometry)
      VALUES ($1, $2, $3,$4,ST_MakeEnvelope($5,$6,$7,$8, 4326) )`,[req.query.x1,req.query.x2,req.query.y1,req.query.y2,req.query.y1,req.query.x1,req.query.y2,req.query.x2], (error, results) => {
     if (error) {
       throw error
     }
   //   response.status(200).json(results.rows)
   console.log(results)
   })
   console.log(req.query)
   res.send({response : "recieved your request!",
   success : true});});
   app.listen(4000);
