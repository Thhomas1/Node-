var express = require('express');
var router = express.Router();

router.post('/registro'),function(req,res,next) {
    const registro = [
        {
            id:1,
            nombre:"Leandro" 
        },
        {
            id:2,
            nombre:"Thomas" 
        }
    ]
    resizeBy.json(registro)
}



