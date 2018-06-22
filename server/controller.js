const axios = require('axios')
require('dotenv').config()

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
    addappointment: (req,res) => {
        const db = req.app.get('db');
        const {firstname, lastname, phonenumber, service, date, time, notes }=req.body

        db.add_appointment(firstname, lastname, phonenumber, service, date, time, notes)
            .then(appointment => res.status(200).send(appointment))
            .catch(x => res.status(500).send(x))
    },
    addblogpost:(req, res) => {
        const db = req.app.get('db')
        const {title, blogpost} = req.body

        db.add_blog_post(title, blogpost)
        .then(posts => res.status(200).send(posts))
        .catch(x => res.status(500).send(x))
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
    }

}

