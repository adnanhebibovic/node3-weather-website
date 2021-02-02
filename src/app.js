const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Adnan Hebibovic'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        author: 'Adnan Hebibovic'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Adnan Hebibovic',
        text: 'Enter the city and hit enter. There is no more than that!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city)
    {
        return res.send({
            error: 'You must provide a city'
        })
    }

    forecast(req.query.city, (error, data) => {
        if (error) {
            return res.send({
                city: req.query.city,
                error: error
            })
        } 
        
        res.send({
            city: data.city,
            country: data.country,
            weather: data.weather,
            temperature: data.temperature,
            feelslike: data.feelslike,
            weather_icons: data.weather_icons
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        author: 'Adnan Hebibovic',
        text: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        author: 'Adnan Hebibovic',
        text: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})