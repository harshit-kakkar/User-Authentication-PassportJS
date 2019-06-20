const express = require ('express')
const session = require('express-session')
const passport = require('./passport')
const { 
    db
 }  = require('./db')
const app = express()

app.set('view engine','hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(session({
    secret: 'jhffkjnjdbyunlfnfh37eef7yhwwrlkm',
    resave: false,
    saveUninitialized: true
})
)

app.use(passport.initialize());
app.use(passport.session())


app.use ('/signup' , (require('./routes/signup').route))

app.use ('/login' , (require('./routes/login').route))

app.use ('/profile' , (require('./routes/profile').route))


app.get('/',(req,res) => {
    if(!req.user){
        return res.redirect('/login')
    }
    res.redirect('/profile')
})


db.sync()
.then(()=>{
    app.listen(8877)
})
