const nbaGames = async function() {
    var gamesEl = document.getElementById('games')
    var games = await fetch('https://gy62hh4w41.execute-api.us-east-1.amazonaws.com/default/nbagames');
    var gamesArray = await games.json();

    // example date
    var today = new Date("10/03/2021");
    var gamesForDate = getGamesInDate(today, gamesArray);
    console.log("TODAY'S GAMES:", gamesForDate);

//     await gamesArray.forEach(game => {
//         gamesEl.innerHTML += game.homeTeam.teamName;
//         gamesEl.innerHTML += ' vs '
//         gamesEl.innerHTML += game.awayTeam.teamName;
//         gamesEl.innerHTML += ' '
//         gamesEl.innerHTML += game.gameDateTimeEst;
//         gamesEl.innerHTML += '<br>'
//     });
}

function getGamesInDate(date, games) {
    return games.filter(game => {
        var gameDate = new Date(game.gameDateTimeUTC);
        return date.getFullYear() === gameDate.getFullYear() && date.getMonth() === gameDate.getMonth() && date.getDate() === gameDate.getDate();
    });
}