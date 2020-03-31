const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema }  = require('graphql');

const app = express();
app.use(bodyParser.json())


app.use('/app',graphqlHttp({  // use --middleware
    // all type schema
    schema: buildSchema(`     
        type RootQuery {
                events: [String!]!
                test1 : String!
                test2 : Int!
        }
        type RootMutation{
            createEvent(name: String,age: Int): String 
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: { // resolver
        events: ()=>{
            return ['A','B','C'];
        },
        test1: ()=>{
            return 'xyz'
        },
        test2: ()=>{
            return 1233445;
        },
        createEvent: ({name,age})=>{

            return name;
        }
    },
    graphiql: true  // for graphql playground
}))


app.listen(3000,function(){
    console.log('your app is running on http://localhost:3000/app')
});