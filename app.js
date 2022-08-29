var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require("jsonwebtoken")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products'); //aggx1
var registroRouter = require('./routes/registro'); // paraabajoagg
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var app = express();

app.set("thomaskeysh","123456")




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/products',validateToken ,productsRouter); //aggx2
app.use('/products',productsRouter); 
app.use('/registro', registroRouter); //paraabajoaggx2                                                                        
app.use('/login', loginRouter);                                           
//app.use('/routes/home',homeRouter);  esto tendria que estar agregado o no?


/*
app.use('/users/registro', registroRouter); 
app.use('/users/login', loginRouter);  

Profe esto no tendria que estar asi? porque me dijiste que estaba bien pero tambien 
me habias dicho que junte login y registro en users
 

*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


function validateToken(req,res,next){
jwt.verify(req.headers["x-access-token"],req.app.get("thomaskeysh"),function(error,payload){
if(error){
  return res.status(403).json({message:error.message})
}else{
  console.log(payload)
  req.body.payloadToken=payload
  next()
}

})

}
app.validateToken = validateToken





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:err?.message || "Se ha producido un error"});
});

module.exports = app;
