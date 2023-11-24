
// appel à l'API en utilisant la ville et l'apikey en paramètre.
// fetch pour effectuer la requête, await pour attendre la réponse, fonction displayWeather pour afficher les données
async function callWeather(city, apiKey) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
        // vérifie en console les données récupérées
        console.log(data);
    } catch (error) {
        // affiche en console un message d'erreur si l'appel à l'API n'a pas fonctionné
        console.error('Error retrieving weather data', error);
    }
}

// affiche les données en récupérant les éléments de l'HTML
function displayWeather(data) {
    if(data && data.main) {
        document.querySelector('#city').textContent = data.name;

        // Math.round pour arrondir la valeur de la température à l'entier le plus proche
        const temperature = Math.round(data.main.temp);
        document.querySelector('#temperature span').textContent =  temperature + '°C';

        document.querySelector('#humidity span').textContent = data.main.humidity + '%';
        document.querySelector('#wind span').textContent = data.wind.speed + 'm/s';
    } else {
        // affiche une erreur si les données ne sont pas renvoyées (ville non récupérée)
        console.error('invalid data');
    }
}

// lecture du fichier conf.json
// fetch pour effectuer la requête, await pour attendre la réponse
// si la lecture est ok, elle renvoie l'objet du fichier sinon elle renvoie null
async function readConfig() {
    try {
        const response = await fetch('conf.json');
        const config = await response.json();
        // vérifie en console les données récupérées du fichier json
        console.log(config);
        return config;
    } catch (error) {
        // affiche un message d'erreur en console si la requête n'a pas abouti
        console.error('Error reading the configuration file', error);
        return null;
    }
}

// fonction appelée toutes les heures pour rafraîchir les données avec setInterval
async function refreshData() {
    // vérifie que la fonction est bien appelé en affichant un message dans la console
    console.log('Data refresh in progress...');

    // appel readConfig pour lire le fichier json. Si ok, elle appelle callWeather pour récupérer les données météo
    const config = await readConfig();
    if (config) {
        const { city, apiKey } = config;
        await callWeather(city, apiKey);
    }
}

setInterval(refreshData, 3600000);

// Appel initial lors du chargement de la page
refreshData();