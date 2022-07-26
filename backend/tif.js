var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
const Pool = require('pg').Pool
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'downloadsatelite',
password: '1234',
port: 5432,
})




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json())
app.get('/tif', function(req, res){
   pool.query(`select image_path from clipimages`, (error, results) => {
    try {
		
        res.sendFile(results.rows[0].image_path)
    
    }
    catch(e){
         res.status(400).send({ result: 'Invalid Input' });
    }
})

;});
app.listen(4000);
