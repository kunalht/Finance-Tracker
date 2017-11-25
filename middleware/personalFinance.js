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
    c.query('SELECT * FROM TRANSACTIONS WHERE userId=?',
    [2],function(err,transactions){
        if(err){
            console.log(err)
        }else{
            let balance
            transactions.forEach(function(transaction){
                balance = balance + transaction.credit - transaction.debit
            })
            res.render("personalFinance/index.ejs",{transactions:transactions,balance:balance})
        }
    })
}

pfMiddleware.newExpense = (req, res) => {
    res.render('personalFinance/newExpense')
}

pfMiddleware.newIncome = (req, res) => {
    res.render('personalFinance/newIncome')
}

pfMiddleware.postNewExpense = (req,res) => {
    let name = req.body.name
    let desc = req.body.description
    let debit = req.body.debit
    
    c.query("INSERT INTO TRANSACTIONS(NAME,userId,DESCRIPTION,DEBIT) VALUES(?,?,?,?)",
    [name,2,desc,parseFloat(debit)],function(err,newTransaction){
        if(err){
            console.log(err)
        }else{
            console.log(newTransaction)
            res.redirect("/pf/home")
            
        }
    })
}



pfMiddleware.postNewIncome = (req,res) => {
    let name = req.body.name
    let desc = req.body.description
    let credit = req.body.credit
    
    c.query("INSERT INTO TRANSACTIONS(NAME,userId,DESCRIPTION,CREDIT) VALUES(?,?,?,?)",
    [name,2,desc,parseFloat(credit)],function(err,newTransaction){
        if(err){
            console.log(err)
        }else{
            console.log(newTransaction)
            res.redirect("/pf/home")
            
        }
    })}
  module.exports = pfMiddleware;