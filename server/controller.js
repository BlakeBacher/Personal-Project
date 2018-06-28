const axios = require('axios')
require('dotenv').config()
const twilio = require('twilio');
const schedule = require('node-schedule')
const moment = require('moment')



const {
    ACCESS_TOKEN
} =  process.env


module.exports = {
    getposts: (req, res) => {
   
        axios.get(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${process.env.ACCESS_TOKEN}`).then(result => {
            let images = result.data.data.map((element, i) => {
                return element.images.standard_resolution.url
            })
            let captions = result.data.data.map((element, i) => {
                return element.caption.text
            })
            let response = {images, captions}
            res.status(200).send(response)
        })
        .catch(x => {res.status(500).send(x)})
    },
    getappointments: (req, res) => {
        const db = req.app.get('db')

        db.get_appointments()
        .then(appointments => res.status(200).send(appointments))
        .catch(x => res.status(500).send(x))
    },
    getblogposts: (req, res) => {
        const db = req.app.get('db')

        db.get_blog_posts()
        .then(blogposts => res.status(200).send(blogposts))
        .catch(x => res.status(500).send(x))
    },
    getproducts: (req,res) => {
        const db = req.app.get('db')

        db.get_products()
        .then(products => res.status(200).send(products))
        .catch(x => res.status(500).send(x))
    },
    addappointment: (req,res) => {
        const db = req.app.get('db');
        const {firstname, lastname, phonenumber, service, date, time, notes }=req.body

        let dateArr = date.split('-')

        let timeone = time.replace(/[AMP]|\s/g,'')
        let timetwo = timeone.split(/[:-]/);

        let result = moment([...dateArr, ...timetwo]).subtract(1,'day').toArray()

        let exacttime = result + result[1] - 1
        
        //                         YYYY        MM          DD           HH         MM       S
        var textDate = new Date(exacttime[0], exacttime[1], exacttime[2], exacttime[0], exacttime[1], 0);
        console.log(textDate)
        // var textDate = new Date(dateArr[0], dateArr[1], dateArr[2], timetwo[0], timetwo[1], 0);
        // var textDate = new Date(2018, 5, 28, 9, 18, 0);
        var j = schedule.scheduleJob(textDate, function(){
        
            const accountSid = process.env.TWILIO_SID;
            const authToken = process.env.TWILIO_TOKEN;
            var client = new twilio(accountSid, authToken);

            client.messages.create({
                body: 'Testing',
                to: phonenumber,  // Text this number
                from: process.env.TWILIO_NUMBER // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));

        });

        db.add_appointment(firstname, lastname, phonenumber, service, date, time, notes)
            .then(appointment => res.status(200).send(appointment))
            .catch(x => res.status(500).send(x))
    },
    addblogpost:(req, res) => {
        const db = req.app.get('db')
        const {title, blogpost} = req.body
        let id = req.user.id

        db.add_blog_post(title, blogpost, id)
        .then(posts => res.status(200).send(posts))
        .catch(x => res.status(500).send(x))
    },
    uploadproducts:(req,res) => {
        const db = req.app.get('db')
        const {products} = req.body

        db.upload_products(products)
        .then(products => res.status(200).send(200))
        .then(x => res.status(500).send(x))
    },  
    deleteappointment: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_appointment(id)
        .then(appointments => res.status(200).send(appointments))
        .catch(x => res.status(500).send(x))
    },
    deleteblogpost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_blog_post(id)
        .then(posts =>  res.status(200).send(posts))
        .catch(x => res.status(500).send(x))
    },
    editappointment: (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id
        const {firstname, lastname, phonenumber, service, date, time, notes} = req.body

    db.edit_appointment(id, firstname, lastname, phonenumber, service, date, time, notes)
        .then(appointment => res.status(200).send(appointment))
        .catch(x => res.status(500).send(x))
    },
    editblogpost: (req, res) => {
        const db = req.app.get('db')
        const id = req.params.id
        const {title, post} = req.body

        db.edit_blog_post(id, title, post)
        .then(posts => res.status(200).send(posts))
        .catch(x => res.status(500).send(x))
    },
    editproducts: (req,res) => {
        const db = req.app.get('db')
        const id = req.params.id
        const {products,hair,chemicaltreatment,lashes} = req.body

        db.edit_products(id, products,hair,chemicaltreatment,lashes)
        .then(products => res.status(200).send(products))
        .catch(x => res.status(500).send(x))
    },
}

