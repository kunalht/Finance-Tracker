let express = require("express"),
router = express.Router(),
middlewareObj = require("../middleware/index"),
pfMiddlewareObj = require("../middleware/personalFinance")

router.get('/pf/home',pfMiddlewareObj.home)
router.get('/pf/new',pfMiddlewareObj.newExpense)
router.post('/pf/new',pfMiddlewareObj.postNewExpense)

module.exports = router;