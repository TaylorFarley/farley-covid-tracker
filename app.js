const express = require('express')
const path = require('path')
const app = express();
const viewPath = path.join(__dirname, './views')

const fetch = require('node-fetch')
app.set('views-engine', 'ejs')
app.set('views', viewPath)
const port = process.env.PORT || 3000


const bodyParser = require('body-parser')
app.use(bodyParser.json())


const publicDirectoryPath = path.join(__dirname, './public')

app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/reverseGeocode', (req, res) => {
   console.log(req.body.long)
   console.log(req.body.lat)
   
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${req.body.lat}&lon=${req.body.long}&zoom=18&addressdetails=1`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      res.send({
          data
      })
    })

   
})


app.get('/getVirus', (req,res)=>{
   
    fetch(`${process.env.APIURI}`)
        .then(result => {
            return result.json()
        })
        .then(data => {
            res.send({
                data
            })
        })
        .catch(error => console.log(error))

});



  


app.get('/request', (req,res)=>{
    const lat = req.query.lat
    const long = req.query.long
    const api = process.env.APIKEY
    fetch(`http://api.weatherstack.com/current?access_key=${api}&query=${lat},${long}&units=f`)
        .then(result => {
            return result.json()
        })
        .then(data => {
            res.send({
                data
            })
        })
        .catch(error => console.log(error))

});




app.listen(port, () => {
    console.log('we are RUNNIN')
})