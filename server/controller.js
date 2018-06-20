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
    addappointment: (req,res) => {
        const db = req.app.get('db');
        const {firstname, lastname, phonenumber, service, date, time, notes }=req.body

        db.add_appointment(firstname, lastname, phonenumber, service, date, time, notes)
            .then(appointment => res.status(200).send(appointment))
            .catch(x => res.status(500).send(x))
    },
    deleteappointment: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        db.delete_appointment(id)
        .then(appointments => res.status(200).send(appointments))
        .catch(x => res.status(500).send(x))
    }
}