const request = require('request')

const forecast = (city, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9c8e3655557a0a9b79fe365ca8f25dcb&query=' + city + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        const data = {
            city: '',
            country: '',
            weather: '',
            temperature: '',
            feelslike: '',
            weather_icons: ''
        }

        if (error) {
            callback('Unable to connect to the weather service. Please check network connectivity!', undefined)
        } else if (response.body.error) {
            callback('Unable to find specified location. Check location provided and try again!', undefined)
        } else {
            data.city = response.body.location.name
            data.country = response.body.location.country
            data.weather = response.body.current.weather_descriptions
            data.temperature = response.body.current.temperature
            data.feelslike = response.body.current.feelslike
            data.weather_icons = response.body.current.weather_icons
            
            callback(undefined, data)
        }
    })
}

module.exports = forecast
