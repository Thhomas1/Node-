const mongoose = require("../bin/mongodb")
const errorMessage = require('../util/errorMessage')
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        minLength:[3,errorMessage.GENERAL.minlength],
        maxLength:[150,errorMessage.GENERAL.maxlength],
        index:true,
        lowercase:true,
        unique:[true,errorMessage.GENERAL.nocopy]
        /*       UsuarioSchema.virtual('nombre')
                    .get(function)(){
                    return this.nombre;    poner siempre la const 
            
            */ 
    },
    codigo:{
        type:String,
        required:[true,errorMessage.GENERAL.numero_obligatorio],
        unique:true
    },
    description:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        minLength:[2,errorMessage.GENERAL.minlength],
        trim:true
        
    },
    price:{
        type:Number,
        required:[4,errorMessage.GENERAL.campo_obligatorio],
        min:[0,errorMessage.GENERAL.numero_obligatorio],
        get: function(value){
            return value * 1.21
        }
        
    },
    quantity:{
        type:Number,
        required:[true,'El campo {PATH} es obligatorio'],
        lowercase:[true,errorMessage.GENERAL.lowercase],
        min:[0,errorMessage.GENERAL.numero_obligatorio],
    },
    status:{
        type:String,
        required:true,
        uppercase:true,
        default:"inicial",
        enum:["inicial","desarrollo","vencido","actualizar"]
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    destacados:{
        type:mongoose.Schema.ObjectId,
        ref:"destacados",
        enum:["destacados","nodestacados"]
        
    },
    usdprice:{
        type:mongoose.Schema.ObjectId,
        ref:"usdprice"
    }
       
})
productSchema.virtual("price_currency").get(function(){
    return "$ "+this.price
})
productSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model("productos",productSchema)

{
 productSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model("usdprice",productSchema)
}
{
productSchema.set("toJSON",{getters:true,setters:true,virtuals:true})
module.exports = mongoose.model("destacados",productSchema)
}



/*
para el create 


}).set(function(nombre){
    var nombreDividido = nombre.split(' ');
    this.nombre = nombreDividido[0] .. ''
}




*/
