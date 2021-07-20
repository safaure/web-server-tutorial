const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2ZhdXJlIiwiYSI6ImNrcjV5eDgwcjA4d3Iyd2xwZWFqejJsMXoifQ.OTOTPa2iB6t2lW9ZdaNupg&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const placeName = body.features[0].place_name
            const latitude = body.features[0].geometry.coordinates[1]
            const longitude = body.features[0].geometry.coordinates[0]
            callback(undefined, {
                location: placeName, 
                latitude, 
                longitude
            })
        }
    })
}

module.exports = geocode
