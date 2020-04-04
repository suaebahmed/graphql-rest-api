const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const Event = require('./models/event')
const User = require('./models/user')
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


app.use('/app',graphqlHttp({ 
    schema: buildSchema,
    rootValue: resolvers,
    graphiql: true 
}))


app.listen(3000,function(){
    console.log('your app is running on http://localhost:3000/app')
});