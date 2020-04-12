const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const buildSchema = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')

const app = express();
app.use(bodyParser.json())

const url = 'mongodb://127.0.0.1:27017/graphql-rest-api';
mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true })
.then(()=>{
    console.log("successfully mongodb database connected")
})
.catch(err=>{
    console.log(err);
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','POST,GET,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    // must have pre-defined header
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
  });
  
app.use('/app',graphqlHttp({ 
    schema: buildSchema,
    rootValue: resolvers,
    graphiql: true 
}))

app.listen(5000,function(){
    console.log('your app is running on http://localhost:5000/app')
});