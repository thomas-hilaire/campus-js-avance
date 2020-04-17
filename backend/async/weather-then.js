const weather = require('weather-js');

const weatherPromise = new Promise((resolve, reject) => {
    weather.find({search: 'San Francisco, CA', degreeType: 'F'}, function(err, result) {
        if(err) return reject(err);
        return resolve(result);
    });
});

function convertToCelsius(tempeture) {
    return tempeture + 10;
}

function sendSmsToMaxime() {
    return Promise.resolve('ici il faudrait utiliser une API qui permet d\'envoyer des sms');
}

weatherPromise
    .then(result => {
        return result[0].current.temperature;
    })
    .then(tempeture => {
        return convertToCelsius(tempeture);
    })
    .then(tempetureInCelsius => {
        if (tempetureInCelsius > 60) {
            return sendSmsToMaxime();
        }
        return false;
    })
    .then(smsIsSent => {
        if (smsIsSent) {
            console.log('C est bon le sms est envoyé');
        } else {
            console.log('Non pas de sms envoyé');
        }
    });

