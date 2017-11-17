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
    res.render('group/addMember')
}

groupMiddleware.postMember = (req,res) => {
    // Find group by :id check if the current user is in the group or not
    c.query('SELECT * FROM GROUPS WHERE ID=2',function(err,foundGroup){
        if(err){
            console.log(err)
        }else{
            // console.log(foundGroup)
            // Find user from req.body from form. If the user exists, add him in the group
            // Check if the user is not already in the group
            c.query('SELECT * FROM USER WHERE ID=2',function(err,foundUser){
                if(err){
                    console.log(err)
                }else{
                    console.log(foundUser)
                    c.query('INSERT INTO GROUPMEMBERS(groupId,userId) VALUES(?,?)',
                    [2,2],function(err,newMember){
                        if(err){
                            console.log(err)
                        }else{
                            console.log(newMember)
                        }
                    })
                }
            })
        }
    })
    console.log(req.body)
    console.log(req.params)
}

groupMiddleware.getAllGroups = (req,res) => {
    // Get list of all groups by  
    c.query('SELECT * FROM GROUPMEMBERS WHERE userId=?',[2],function(err,foundGroupMembers){
        if(err){
            console.log(err)
        }else{
            foundGroupMembers.forEach(function(group){
                // All groups
                c.query('SELECT * FROM GROUPS WHERE ID=?',[group.groupId],function(err,foundGroups){
                    if(err){
                        console.log(err)
                    }else{
                        console.log(foundGroups[0].name)
                    }
                })
            })
        }
    })
}
module.exports = groupMiddleware

