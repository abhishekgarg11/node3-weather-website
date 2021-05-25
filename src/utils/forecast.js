const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da36ceec55caff37d5a3ba209207f29e&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.error) {
            callback('Unable to find location.Try another search', undefined)
        }
        else {
            callback(undefined, {
                currentTemp: body.current.temperature,
                feelsLike: body.current.feelslike,
                description:body.current.weather_descriptions[0],
                windspeed:body.current.wind_speed
            })
        }
    })
}

module.exports = forecast