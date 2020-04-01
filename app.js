const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema }  = require('graphql');
const mongoose = require('mongoose');
const Event = require('./models/event')
const User = require('./models/user')
const bcrypt = require('bcryptjs')

const url = 'mongodb://127.0.0.1:27017/graphql-rest-api';
mongoose.connect(url, {  useUnifiedTopology: true , useNewUrlParser: true })
.then(()=>{
    console.log("successfully mongodb database connected")
})
.catch(err=>{
    console.log(err);
})
const app = express();
app.use(bodyParser.json())


app.use('/app',graphqlHttp({ 
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type User {
            _id: ID!
            email: String!
            password: String!
        }
        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!
        }


        type RootQuery {
            events: [Event!]!
            user(_id: ID!): User!
        }
        type RootMutation{
            createEvent( a:EventInput): Event
            createUser(email: String! password: String!): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: { // resolver
        events: ()=>{
                 return Event.find() // return whole promise
                 .then((result)=>{
                    return result
                 })
                 .catch(err=>{
                    throw err;
                 })
        },
        user: (args)=>{
            let id = args._id;
            console.log(id)
            return User.findById(id)
            .then(result=>{
                console.log(result)
                return result;
            })
            .catch(function(err){
                throw err;
            })
        },
        createEvent: (args)=>{
            let x = new Event({
                title: args.a.title,
                description: args.a.description,
                price: args.a.price,
                date: new Date(args.a.date)
            }) 
            x.save()
            .then(data=>{
                console.log(data)
                return;
            })
            .catch(err=>{
                throw err
            })
            console.log('reached the executed code here');
            return x;
        },
        createUser: (args)=>{
            return User.findOne({email: args.email})
                       .then((user)=>{
                            if(user){
                                // return {
                                //     msg: "user already exist",
                                //     password: 'email alreay exist',
                                //     email: args.email
                                // }
                                return new Error('user already exist')
                            }else{

                               return bcrypt.hash(args.password,12)
                                        .then(hash=>{
                                            let newUser = new User({
                                                email: args.email,
                                                password: hash
                                            }) 
                                            return newUser.save()
                                            .then(result=>{
                                                console.log(result)
                                                return result
                                            })
                                            .catch(err=>{
                                                throw err
                                            })
                                        })
                                        .catch(err=>{
                                        throw err
                                    })
                            }
                       })
                       .catch(err=>{
                        throw err
                    })
        }
    },
    graphiql: true 
}))


app.listen(3000,function(){
    console.log('your app is running on http://localhost:3000/app')
});