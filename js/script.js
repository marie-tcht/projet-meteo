
/* la clé de l'API Open Weather */
const apiKey = '7fcd26b709413d4c79589ce1fc2e8736';


/* Appel à l'API avec la méthode fetch*/
let callWeather = function(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then((response) =>
            response.json().then((data) => {
                displayWeather(data);
                /* vérifier que je récupère bien mes données en console */
                console.log(data);
            })
    )
        .catch((error) => {
            /* affiche en console une erreur si les données n'ont pas pu être récupérées */
            console.error('error fetching weather data', error);
        });
}

/* Fonction displayWeather qui me permet d'aller sélectionner des éléments de mon HTML pour lui intégrer les données de mon appel à l'API */
function displayWeather(data) {
    if(data && data.main) {
        document.querySelector('#city').textContent = data.name;

        /* Math.round pour arrondir la valeur de la température à l'entier le plus proche */
        const temperature = Math.round(data.main.temp);
        document.querySelector('#temperature span').textContent =  temperature + '°C';

        document.querySelector('#humidity span').textContent = data.main.humidity + '%';
        document.querySelector('#wind span').textContent = data.wind.speed + 'm/s';
    } else {
        console.error('invalid data');
    }
}

/* j'apelle automatiquement la ville de Lyon au chargement de ma page */
callWeather('Lyon');