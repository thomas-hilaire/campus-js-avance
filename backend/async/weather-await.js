const util = require('util');
const weather = require('weather-js');

// util.promisify est un outil dans nodejs qui permet de changer
// une methode qui utilise un callback, en une methode qui retourne une promesse
const findWithPromise = util.promisify(weather.find);
// findWithPromise c'est comme weather.find en mode "promesse"
const weatherPromise = findWithPromise({search: 'San Francisco, CA', degreeType: 'F'});

function convertToCelsius(tempeture) {
    return tempeture + 10;
}

function sendSmsToMaxime() {
    return Promise.resolve('ici il faudrait utiliser une API qui permet d\'envoyer des sms');
}

async function sendSmsIfTooHotForMaxime() {
    const result = await weatherPromise;
    const currentTemperature = result[0].current.temperature;
    const currentTemperatureInCelsius = convertToCelsius(currentTemperature);

    if (currentTemperatureInCelsius > 60) {
        await sendSmsToMaxime();
        console.log('C est bon le sms est envoyé');
    } else {
        console.log('Non pas de sms envoyé');
    }
}

sendSmsIfTooHotForMaxime();

