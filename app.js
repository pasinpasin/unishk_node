
const express=require('express');
const morgan=require("morgan");
const userRouter = require('./routes/users/userRouter');
const fakultetiRouter = require('./routes/fakultetiRouter');
const departamentiRouter=require("./routes/departamentiRouter");
const programiRouter = require('./routes/programiRouter');
const planetmesimoreRouter = require('./routes/planetmesimoreRouter');
const planpermbajtjaRouter = require('./routes/planpermbajtjaRouter');
const ngarkesaRouter= require('./routes/ngarkesat/ngarkesaRouter');
const ngarkesepermbajtjaRouter= require('./routes/ngarkesepermbajtja/ngarkesepermbajtjaRouter');
const evidencaRouter= require('./routes/evidencat/evidencaRouter');
const globalErrorHandler=require("./controllers/error/globalErrorHandler")
const path=require("path");
const app=express();
//var mustacheExpress= require("mustache-express");
app.set('view engine', 'pug');
//app.set('view engine', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }


app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/fakulteti', fakultetiRouter);
  app.use('/api/v1/departamenti', departamentiRouter);
  app.use('/api/v1/programi', programiRouter);
  app.use('/api/v1/planetmesimore', planetmesimoreRouter);
  app.use('/api/v1/planpermbajtja', planpermbajtjaRouter);
  app.use('/api/v1/ngarkesa', ngarkesaRouter);
  app.use('/api/v1/ngarkesepermbajtja', ngarkesepermbajtjaRouter);
  app.use('/api/v1/evidenca', evidencaRouter);
  
  
  app.use(globalErrorHandler);
  module.exports = app;