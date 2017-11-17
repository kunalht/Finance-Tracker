let express = require("express"),
router = express.Router(),
middlewareObj = require("../middleware/index"),
groupMiddleware = require("../middleware/group");


router.get("/group/new",groupMiddleware.getNewGroup)
router.post("/newGroup",groupMiddleware.createGroup)
router.get("/group/:id/addMember",groupMiddleware.addNewMember)
router.post("/group/newMember",groupMiddleware.postMember)
// router.post("/group/:id/newMember",groupMiddleware.postMember)
router.get("/group/index",groupMiddleware.getAllGroups)

module.exports = router;