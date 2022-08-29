const priceModel = require("../models/usdModel")
module.exports={
    getAll:async function(req, res, next) {
      try{
        const priceusd = await priceModel.find()
        res.json(priceusd)
      }catch(e){
        next(e)
      }
    },
    create:async function(req, res, next) {
        try{
          console.log(req.body)
          console.log(req.body.name)

          const document = new priceModel({
            name:req.body.name
          })

          const response = await document.save()

          res.json(response)
        }catch(e){
          //e.status=200
          next(e)
        }
        
    },
    
}