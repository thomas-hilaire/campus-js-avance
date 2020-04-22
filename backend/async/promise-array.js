const weather = require('weather-js');

// Cette méthode n'est pas importante, elle vous retourne juste une promesse de la temperature de la ville
function findCityWeather(city) {
    return new Promise((resolve, reject) => {
        weather.find({search: city, degreeType: 'C'}, function(err, result) {
            if(err) return reject(err);
            return resolve(result[0].current.temperature);
        });
    });
}

const cities = [
    'Valence, Drôme, Auvergne-Rhône-Alpes, France',
    'Annecy, Haute-Savoie, Auvergne-Rhône-Alpes, France',
    'Grenoble, Isère, Auvergne-Rhône-Alpes, France',
];
// "cities" est un tableau de valeur



const citiesWeatherPromises = cities.map(city => findCityWeather(city));
// "citiesWeatherPromises" est un tableau de promesses, on pourrait le penser comme cela:
// [
//   Promise('weather of Valence'),
//   Promise('weather of Annecy'),
//   Promise('weather of Grenoble'),
// ]



Promise.all(citiesWeatherPromises).then((weathers) => {
    // Promise.all permet d'attendre que la météo de toutes les villes soit trouvée, avant d'appeler le .then
    // Promise.all conserve l'ordre du tableau
    // "weathers" est un tableau de valeur, avec la météo de chaque ville, par exemple :)
    // [
    //   36,
    //   28,
    //   17,
    // ]
    weathers.forEach((weather, index) => {
        console.log(`Il fait ${weather}°C à ${cities[index]}`);
    });
});
