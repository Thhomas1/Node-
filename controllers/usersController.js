const usersModels = require("../models/usersModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports={
  
    create:async function(req, res, next) {    //post
      try {
        console.log(req.body)                   //usar siempre try catch
        
        const user = new usersModels({
          name:req.body.name,
          email:req.body.email,
          password:bcrypt.hashSync(req.body.password,10)
        })
        const document = await user.save()   // muchisimo mas automatico que el then
        res.json(document)
      
      } catch(e){
        next(e) 
        //console.log(e) //por ahora que solo imprima en la consola
      }
    },
    login:
    async function(req, res, next) {    
      try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
          res.json({message:"Email incorrecto"})
          return;
        }
        if(bcrypt.compareSync(req.body.password,user.password)){
          const payload = {userId:user._id}
          const token   = jwt.sign(payload,"123",{expireIn:"2h"})
          return res.status(200).json({token})
    
        }else{
          return res.status(401).json({message:"Contraseña incorrecta"})
        }
        
      
      } catch(e){
        console.log(e)
        next(e) 
       
      }
    },
    
}