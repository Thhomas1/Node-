const productsModel = require("../models/productosModels")
const categoryModel = require("../models/categoriesModel")
const usdModel = require("../models/usdModel")
module.exports={
  getAll:async function(req, res, next) {
    try{
      let queryFind={}
      if(req.query.buscar){
        queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
        //{price:{$lte:1000}}
      }
      const documents = await productsModel.find(queryFind).populate("category")
      .select("name price").sort({price:-1,name:1})
      res.status(200).json(documents);
    }catch(e){
      next(e)
    }  



          /*                                                           probando usdprice!!!
      try{
                let queryFind={}
                if(req.query.buscar){
                  {price:{$lte:1000}}
            }
          
          const documents = await usdModel.find(price:5000).populate("usdprice")      
          .select("usdprice").sort({price:-1})
          res.status(200).json(documents);
        }catch(e){
          next(e)
        }  */
    },



    getById: async function(req, res, next) {
      console.log(rqe.params.id)
      try {
        let queryFind={}
      if(req.query.buscar){
        queryFind={destacados:true}}
       
        const documents = await productsModel.find(queryFind).populate("destacados")
        .select("destacados")
        res.status(200).json(documents);
      }catch(e){
        next(e)
      }
      



    },
    create:async function(req, res, next) {    //post
      try {
        console.log(req.body)                   //usar siempre try catch
        
        const producto = new productsModel({
          name:req.body.name,
          price:req.body.price,
          codigo:req.body.codigo,
          quantity:req.body.quantity,
          status:req.body.status,
          category:req.body.category,
          usdprice:req.body.usdprice,
          destacados:req.body.destacados,
          userId:req.body.payloadToken.userId
        })
        const documento = await producto.save()   // muchisimo mas automatico que el then
        res.json(document)
      
      } catch(e){
        next(e) 
        //console.log(e) //por ahora que solo imprima en la consola
      }
    },
    update:function(req, res, next) {   //put
        console.log(req.params.id,req.body)
        try{
          const document = await productsModel.updateOne({_id:req.params.id},req.body)
          res.json(document )
        }catch(e){
          res.status(201).json({error:e.message}) // tratamiento particular
          // next(e)
        }
       // res.json(req.body);
    },
    delete: async function(req, res, next) {   //borrar
      console.log(req.params.id,req.body)
      try{
        const document = await productsModel.deleteOne({price:req.params.id})
        res.json(document )
      }catch(e){
        res.status(500).json({error:e.message}) // tratamiento particular
        //next(e)
      }
      
      
    }
}