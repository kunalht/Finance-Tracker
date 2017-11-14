let express = require("express"),
router = express.Router(),
middlewareObj = require("../middleware/index"),
groupMiddleware = require("../middleware/group");


router.get("/group/new",groupMiddleware.getNewGroup)
router.post("/newGroup",groupMiddleware.createGroup)
router.get("/group/addMember",groupMiddleware.addNewMember)

module.exports = router;