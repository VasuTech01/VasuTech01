const request = require('request');

const forcast = (lng,lat, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=42bf796e1d870e9dcdc7eb50d45d4b19&query=" + lng+","+lat;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to Connnect",undefined);
        } else if (response.body.error) {
            calllback("No data Found",undefined);
        } else {
            callback(undefined,{
                current: response.body.current,
                location:response.body.location
            })
          }
    })

}
module.exports = forcast;