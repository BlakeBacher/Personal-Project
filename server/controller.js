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
    
}

