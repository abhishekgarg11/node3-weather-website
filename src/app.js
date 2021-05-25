const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const hbs = require('hbs')
const path = require('path')
const express = require('express')


const app = express()

//Define Path for express
const pubicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

// Set handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(pubicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhishek'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abhishek'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name: 'Abhishek'
    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: 'Weather is '+forecastdata.description+' .Current Temp is ' + forecastdata.currentTemp + ' C but it feels like ' + forecastdata.feelsLike + ' C. Wind Speed is '+forecastdata.windspeed,
                location: location
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search location'
        })
    }
    res.send({
        products: []
    })
})

app.listen(port, () => {
    console.log('Server is running up at port ' + port)
})
