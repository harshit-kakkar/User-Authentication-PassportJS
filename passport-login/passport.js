const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const {Users} = require('./db')


passport.use(new localStrategy(

    function (username,password,done){

        Users.findOne({
            where: {username: username}
        }).then((user) => {

            if(!user){
                return done(null, false)
            }

            if(user.password != password){
                return (null,false)
            }

            done(null,user)

        }).catch(done)

    }

))


passport.use(new FacebookStrategy({

    clientID: '2122406291207336',
    clientSecret: '84724d1441d2afa4e5e528fb99c9e3fe',
    callbackURL: 'http://localhost:8877/login/facebook/callback'

}, function (token,rt,profile,done){
    //****************************** */start writing from here*****************************
}))

passport.serializeUser(
    function(user,done){
        done(null, user.id)
    }
)


passport.deserializeUser(
    function(userId, done){
        Users.findByPk(userId)
            .then((user)=> {
                done(null,user)
            })
            .catch(done)
    }
)

module.exports = passport
