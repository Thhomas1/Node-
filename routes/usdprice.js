var express = require('express');
var router = express.Router();
const usdController = require("../controllers/usdController")
/* GET users listing. */
router.get('/', usdController.getAll);
router.post('/', usdController.create);
module.exports = router;
