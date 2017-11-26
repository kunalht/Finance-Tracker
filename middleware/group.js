let mysql = require('mysql');
let groupMiddleware = {}
console.log("groupMiddleware")

let c = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kunal',
    database: 'projectSoftEng'
});

c.connect();

// Get new group page
groupMiddleware.getNewGroup = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('group/new')
    } else {
        console.log("not logged in")
    }
};


// Post new group
groupMiddleware.createGroup = (req, res) => {
    console.log(req.body)
    console.log(req.user.ID)
    c.query('INSERT INTO groups(name,description,createdByUser) VALUES(?,?,?)', [req.body.name, req.body.description, req.user.ID], function (err, newGroup) {
        if (err) {
            console.log(err)
        } else {
            c.query('INSERT INTO groupMembers(groupId,userId) values(?,?)', [newGroup.insertId, req.user.ID], function (err, newMembers) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(newMembers)
                }
            })
        }
    })
}

// Add new members get page
groupMiddleware.addNewMember = (req, res) => {
    res.render('group/addMember',{groupId:req.params.id})
}

groupMiddleware.postMember = (req, res) => {
    console.log(req.params.id)
    let groupId = req.params.id
    let email = req.body.email
    c.query("SELECT ID FROM USER WHERE EMAIL=?",[email],function(err,newUserId){
        c.query("INSERT INTO GROUPMEMBERS(groupId,userId) VALUES(?,?)",[groupId,newUserId[0].ID],function(err,newMember){
            if(err){
                console.log(err)
            }else{
                console.log(newMember)
    
            }
        })
    })
}

groupMiddleware.getAllGroups = (req, res) => {
    // Get list of all groups by  
    let user = req.user.ID
    c.query("SELECT * FROM GROUPMEMBERS LEFT JOIN GROUPS ON GROUPMEMBERS.GROUPID = GROUPS.ID WHERE userId = ?", [user],
        function (err, foundGroups) {
            if(err){
                console.log(err)
            }else{
                res.render("group/index",{groups:foundGroups})
            }
        })
}

// Add new bill
groupMiddleware.newbill = (req,res) => {
    // :id is groupId
    res.render("group/newbill",{groupId:req.params.id})
}

// Post new Bill
groupMiddleware.postbill = (req,res) => {
    let name = req.body.name
    let paidBy = req.user.ID
    let amount = req.body.amount
    let user = req.user.ID
    let groupId = req.params.id
    // insert new bill
    c.query("INSERT INTO BILL (name,paidByUserId,amount,groupId) VALUES(?,?,?,?)",[name,paidBy,amount,groupId],function(err,newBill){
        if(err){
            console.log(err)
        }else{
            console.log(newBill)

            // Find other group members 
            c.query("SELECT userId from groupmembers where groupId=?",[groupId],function(err,members){
                let totalMembers = members.length
                let splitAmount = parseFloat(amount / totalMembers)
                console.log(members)
                members.forEach(function(member){
                    console.log("member" + member.userId)
                    if(member.userId != user){
                        console.log("memberss" + member.userId)                        
                        c.query("INSERT INTO oweToUser(userId,oweToUserId,billId,amount) values(?,?,?,?)",
                        [user,member.userId,newBill.insertId,splitAmount],function(err,newOwedAmount){
                            if(err){
                                console.log(err)
                            }
                            console.log(newOwedAmount)
                        })
                    }
                })
                res.send("DONE")
            })
        }
    })

}
module.exports = groupMiddleware