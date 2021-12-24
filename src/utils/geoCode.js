const request = require("request");
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidmFzdTI0MjAwMSIsImEiOiJja3g5OHZmdzUwNTZuMzFtd3c4ZGxqejF4In0.M0xs9JPeVARKxTx2rne1YA";
    request({ url:url, json: true }, (error,response) => {
        if (error) {
            callback("unable to connect to the api",undefined);
        } else if (response.body.features.length===0) {
            callback('data not found',undefined);
        } else {
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                placeName:response.body.features[0].text,
              })
        }
    })
}
// geoCode('New York', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })
module.exports = geoCode;