
/* ma clé de l'API Open Weather */
const apiKey = '7fcd26b709413d4c79589ce1fc2e8736';


/* Appel à l'API avec la méthode fetch*/
let callWeather = function(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    fetch(url)
        .then((response) =>
            response.json().then((data) => {
                displayWeather(data);
                clearSearchInput();
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

/* fonction qui va chercher la valeur entrée par l'utilisateur dans l'input pour afficher la météo de la ville demandée par l'utilisateur */
function searchCity () {
    callWeather(document.querySelector('.search-input').value);
}

const searchInput = document.querySelector('.search-input');

/* écouteur d'évènement : si l'utilisateur appuie sur entrée, la fonction searchCity va chercher la valeur entrée dans l'input */
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchCity();
    }
});

/* fonction qui ajoute un écouteur d'évènement sur le bouton. Lorsque l'utilisateur clic, la fonction searchCity va chercher la valeur entrée dans l'input */
document.querySelector('.search-button').addEventListener('click', function(event){
    event.preventDefault();
    searchCity();
});

/* je vide l'input après utilisation */
function clearSearchInput() {
    document.querySelector('.search-input').value = '';
}

/* fonction appelée toutes les heures pour rafraîchir les données avec la valeur actuelle de l'input */
function refreshData() {
    console.log('Rafraîchissement des données en cours...');

    const city = searchInput.value;

    callWeather(city);
}

/* J'ai appelé refreshData() pour vérifier que ma fonction fonctionne mais je le commente car c'était juste pour un essai
refreshData();
*/

/* setInterval permet d'appeler à plusieurs reprises une fonction (premier paramètre) en lui fixant un délai (deuxième paramètre) */
setInterval(refreshData, 3600000);



/* j'appelle automatiquement la ville de Lyon au chargement de ma page */
callWeather('Lyon');