const mysql = require('mysql');
const json = require('json');
const url = require("url");

exports.getData = function(req, res){
    //var stock = (url.parse(req.url, true).symbol);
    var stock = url.parse(req.url, true)['query']['symbol'];
    var path = req.url;

    /* configure the connection parameters with your own info */
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'your_mysql_username',
      password : 'your_password',
      database : 'your_database'
    });

    connection.connect();
    if(path == '/data'){
        // Use Microsoft's stock info as Default data
        connection.query('SELECT * FROM MSFT', function (error, results, fields) {
          connection.end();
          if (error) throw error;
          var jResults = JSON.stringify(results);
          res.end(jResults);
        });
    } else {
        connection.query('SELECT * FROM ' + stock + ' limit 200', function (error, results, fields) {
          connection.end();
          if (error) throw error;
          var jResults = JSON.stringify(results);
          res.end(jResults);
      });
   }
}
