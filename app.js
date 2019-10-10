const credentials = require('./credentials.js')
const request = require('request')

const darkSky = function(latitude, longitude) {
    const url = 'https://api.darksky.net/forecast/' + credentials.DARK_SKY_SECRET_KEY + '/' + 
                 latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, function(error, response) {
        const data = response.body
        const summary = data.hourly.summary
        const temperature = data.currently.temperature
        const rain = data.currently.precipProbability
        //console.log(error)
        console.log(summary + ' Expected temperature of ' + temperature + '°C and ' +
          rain + '% probability of rain.')
    })
}

const mapBox = function(name) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + name + '.json?access_token=' + 
                credentials.MAPBOX_TOKEN
    request({ url, json: true }, function(error, response) {
        const place = response.body
        const longitude = place.features[0].geometry.coordinates[0]
        const latitude = place.features[0].geometry.coordinates[1]
        darkSky(latitude,longitude)
    })
}

//var latitude = 25.6866
//var longitude = -100.3161
mapBox('Zurich')