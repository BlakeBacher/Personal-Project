require('dotenv').config()

const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , controller = require('./controller')
    , bodyparser = require('body-parser')
    , path = require('path')
    , stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


    const { 
        SERVER_PORT,
        SESSION_SECRET,
        DOMAIN,
        CLIENT_ID,
        CLIENT_SECRET,
        CALLBACK_URL,
        CONNECTION_STRING,
        // TWILIO_SID,
        // TWILIO_TOKEN
    } = process.env;

    const app = express();
    app.use(bodyparser.json())

    app.use( express.static( `${__dirname}/../build` ) ); //this is for hosting the website



     massive(CONNECTION_STRING).then(db => {
        app.set('db', db);
    })


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
        let{  id, nickname, displayName, picture } = profile;
        db.find_user([id]).then(user => {
            if(user[0]) {
                done(null, user[0].id)
            } else {
                db.create_user([id, nickname, displayName, picture]).then((createdUser) => {
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
    res.redirect(`http://${process.env.DOMAIN}/v2/logout?returnTo=${process.env.REACT_APP_REDIRECT}`)
})
app.get('/login', passport.authenticate('auth0', {connection: 'google-oauth2'})); 
app.get('/login/callback', passport.authenticate('auth0', {
    successRedirect: `${process.env.REACT_APP_FRONTEND_URL}#/admin/home`
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
        successRedirect:`${process.env.REACT_APP_FRONTEND_URL}#/admin/home`
    }else{
        res.status(401).send('Unauthorized')
    }
})
    


app.get('/getphotos', controller.getposts)
app.get('/api/getappointments', controller.getappointments)
app.get('/api/blogposts', controller.getblogposts)
app.get('/api/getproducts', controller.getproducts)
app.get('/api/getpricing', controller.getpricing)
app.post('/api/addappointment', controller.addappointment)
app.post('/api/addblogpost', controller.addblogpost)
app.post('/api/uploadproducts', controller.uploadproducts)
app.delete('/api/deleteappointment/:id', controller.deleteappointment)
app.delete('/api/deleteblogpost/:id', controller.deleteblogpost)
app.put('/api/editappointment/:id' , controller.editappointment)
app.put('/api/editblogpost/:id', controller.editblogpost)
app.put('/api/editproducts/:id', controller.editproducts)
app.put('/api/editpricing/:id', controller.editpricing)

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));  //this is for history.push
});

const port = 3030
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: `, SERVER_PORT)
})
