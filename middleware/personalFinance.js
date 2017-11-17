let mysql = require('mysql');
let pfMiddleware = {}

let c = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kunal',
    database : 'projectSoftEng'
  });

  c.connect();

  // Show balance here
pfMiddleware.home = (req, res) => {
    res.send('home works')
}

pfMiddleware.newExpense = (req, res) => {
    res.render('personalFinance/new')
}

  module.exports = pfMiddleware;