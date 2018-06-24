require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller')
    ,bodyparser = require('body-parser')


    const { 
        SERVER_PORT,
        SESSION_SECRET,
        DOMAIN,
        CLIENT_ID,
        CLIENT_SECRET,
        CALLBACK_URL,
        CONNECTION_STRING,
    } = process.env;

     massive(CONNECTION_STRING).then(db => {
        app.set('db', db);
    })

    const app = express();
    app.use(bodyparser.json())

    app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }))


    app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    // done(null, profile); this is for testing
        const db = app.get('db')
        let{  id, nickname, name, picture } = profile;
        db.find_user([id]).then(user => {
            if(user[0]) {
                done(null, user[0].id)
            } else {
                db.create_user([id, nickname, name, picture]).then((createdUser) => {
                    done(null, createdUser[0].id)
                })
            }
     })
}))

passport.serializeUser((primaryKeyID, done) => {
    done(null, primaryKeyID);

})
passport.deserializeUser((primaryKeyID, done) => {
    app.get('db').find_user_session([primaryKeyID]).then(user => {
        done(null, user[0]);
    })
    //what ever profile comes out of here. Can be accessible as req.user
    //If you remember one thing about authentication remember this can be used as req.user.
})


app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(`http://${process.env.DOMAIN}/v2/logout?returnTo=http://localhost:3000`)
})
app.get('/login', passport.authenticate('auth0', {connection: 'instagram'})); 
app.get('/login/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/admin/home'
    ///////////////////////////////////////////////////////////////////ASK MASON ABOUT THIS ////////////////////////////////////////////////////////////////////////////////////////////////////
}))
app.get('/getcurrentuser', (req,res) => {
    if(req.user){
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Nice Try')
    }
})
app.get('/auth/me' ,(req, res) => {
    if(req.user.admin === true){
        res.status(200).send(req.user.admin)
        successRedirect:'http://localhost:3000/#/admin/home'
    }else{
        res.status(401).send('Unauthorized')
    }
})
    


app.get('/getphotos', controller.getposts)
app.get('/api/getappointments', controller.getappointments)
app.get('/api/blogposts', controller.getblogposts)
app.post('/api/addappointment', controller.addappointment)
app.post('/api/addblogpost', controller.addblogpost)
app.delete('/api/deleteappointment/:id', controller.deleteappointment)
app.delete('/api/deleteblogpost/:id', controller.deleteblogpost)
app.put('/api/editappointment/:id' , controller.editappointment)
app.put('/api/editblogpost/:id', controller.editblogpost)   
    
const port = 3030
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: `, SERVER_PORT)
})