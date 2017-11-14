let mysql = require('mysql');
let groupMiddleware = {}
console.log("groupMiddleware")

let c = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kunal',
    database : 'projectSoftEng'
  });

  c.connect();

// Get new group page
groupMiddleware.getNewGroup= (req,res)=>{
    if(req.isAuthenticated()){
        res.render('group/new')
    }else{
        console.log("not logged in")
    }
};


// Post new group
groupMiddleware.createGroup = (req,res) => {
    console.log(req.body)
    console.log(req.user.ID)
    c.query('INSERT INTO groups(name,description,createdByUser) VALUES(?,?,?)',
    [req.body.name,req.body.description,req.user.ID],function(err,newGroup){
        if(err){
            console.log(err)
        }else{
            c.query('INSERT INTO groupMembers(groupId,userId) values(?,?)',
            [newGroup.insertId,req.user.ID],function(err,newMembers){
                if(err){
                    console.log(err)
                }else{
                    console.log(newMembers)
                }
            })
        }
    })
        
}

// Add new members get page
groupMiddleware.addNewMember = (req,res) => {
    console.log(req)
}

module.exports = groupMiddleware

