var express = require('express');
var router = express.Router();

router.put('/home'),function(req,res,next) {
    const home = [
        {
            id:1,
            nombre:"Leandro" 
        },
        {
            id:2,
            nombre:"Thomas" 
        }
    ]
    resizeBy.json(home)
}
