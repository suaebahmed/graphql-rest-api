const Event = require('../../models/event')
const User = require('../../models/user')
const Bookings = require('../../models/booking')
// const { dateToString } = require('../../helpers/date');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const events = eventIds =>{
    // console.log(eventIds)  --- for relational object chain 
    return Event.find({_id: {
        $in: eventIds
       }
    }).then(events=>{
        return events.map(event=>{
            return{
                ...event._doc,
                _id: event.id,
                creator: user.bind(this,event.creator)
            }
        })
    })
    .catch(err=>{
        throw err;
     })
}
const user = userId =>{
    // console.log('=========',userId)
    return User.findById(userId)
               .then(user=>{
                return {
                    ...user._doc,
                    _id: user.id,
                    createdEvents: events.bind(this,user._doc.createdEvents)
                }
               })
               .catch(err=>{
                throw err;
             })
}
const singleEvent = async (eventId) =>{
    try{
        let event = await Event.findById(eventId);
        return {
            ...event._doc,
            _id: event.id,
            creator: user.bind(this,event.creator)
        }

    }catch(err){
        throw err;
    }
}

module.exports = {
    events: ()=>{
             return Event.find()
            //  .populate('creator') 
             .then((events)=>{
                //  console.log(events)
                let y= events.map(event=>{
                    return {
                        ...event._doc,
                        _id: event.id,
                        creator: user.bind(this,event.creator)
                    }})
                return y;
             })
             .catch(err=>{
                throw err;
             })
    },
    // user: (args)=>{
    //     let id = args._id;
    //     return User.findById(id)
    //     .then(result=>{

    //         return result;
    //     })
    //     .catch(function(err){
    //         throw err;
    //     })
    // },
    bookEvent: async ()=>{
        try{
            const bookings = await Bookings.find();
            return bookings.map(booking=>{
                return {
                    ...booking._doc,
                    _id: booking.id,
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                }
            })
        }catch(err){
            throw err
        }
    },
//-----------------------  mutation  ---------------------------
    createEvent: (args)=>{
        let newEvent = new Event({
            title: args.a.title,
            description: args.a.description,
            price: args.a.price,
            date: new Date(args.a.date),
            creator: '5e8428e44695872a1c2ea83f'
        }) 
        let x;
        newEvent.save()
        .then(data=>{
            x = data
            return User.updateOne({_id: newEvent.creator},{
                $push: {
                    createdEvents: data._id
                }
            })
        })
        .then(()=>{
            return;
        })
        .catch(err=>{
            throw err
        })
        console.log('reached the executed code here');
        return newEvent;
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
    },
    login: (args)=>{
    },
    bookEvent: async (args)=>{

        try{
            let newBooking = new Bookings({
                event: args.eventId,
                user: '5e842a7816ad0e21e47239a0'
            });
            let result = await newBooking.save()
            // console.log(result);
            // console.log(result._doc);
            // console.log(result._id)
            console.log(result.id)
            return {
                ...result._doc,
                _id: result.id,
                createdAt: new Date(booking._doc.createdAt).toISOString(),
                updatedAt: new Date(booking._doc.updatedAt).toISOString()
            }
        }catch(err){
            throw err;
        }
    },
    cancelBooking: async (args)=>{
        try{
            const booking = await Bookings.findById(args.bookingId).populate('event');
            const event = {
                ...booking.event,
                _id: booking.event.id,
                creator: user.bind(this,event.creator)
            }
            let ss = await Bookings.deleteOne(eventId);
            return event;
        }catch(err){
            throw err;
        }
    }
}