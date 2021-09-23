const inputDate = document.querySelector("#search-games")

const nbaGames = async function(event) {
    event.preventDefault();
    var gamesEl = document.getElementById('display-games');
    var games = await fetch('https://gy62hh4w41.execute-api.us-east-1.amazonaws.com/default/nbagames');
    var gamesArray = await games.json();
    console.log(userDate);
    // example date
    var userDate = new Date(inputDate.value);
    var gamesForDate = getGamesInDate(userDate, gamesArray);
    console.log("TODAY'S GAMES:", gamesForDate);

    gamesForDate.forEach(game => {
        gamesEl.innerHTML += game.homeTeam.teamName;
        gamesEl.innerHTML += ' vs '
        gamesEl.innerHTML += game.awayTeam.teamName;
        gamesEl.innerHTML += ' '
        gamesEl.innerHTML += game.gameDateTimeEst;
        gamesEl.innerHTML += '<br>'
    });
}

function getGamesInDate(date, games) {
    return games.filter(game => {
        var gameDate = new Date(game.gameDateTimeUTC);
        return date.getFullYear() === gameDate.getFullYear() && date.getMonth() === gameDate.getMonth() && date.getDate() === gameDate.getDate();
    });
}

document.getElementById("games").addEventListener("submit", nbaGames)