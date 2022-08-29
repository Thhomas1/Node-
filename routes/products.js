var express = require('express');
var router = express.Router();

const productsController = require("../controllers/ProductsController")

/* GET home page. */
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/',(req,res,next)=>req.app.validateToken(req,res,next), productsController.create);    //validar para un subcojunto/subruta
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);
module.exports = router;
