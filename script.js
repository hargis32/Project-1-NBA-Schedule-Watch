const nbaGames = async function() {
    var gamesEl = document.getElementById('games')
    var games = await fetch('https://gy62hh4w41.execute-api.us-east-1.amazonaws.com/default/nbagames', {});
    var gamesArray = await games.json();
    await gamesArray.forEach(game => {
        gamesEl.innerHTML += game.homeTeam.teamName;
        gamesEl.innerHTML += ' vs '
        gamesEl.innerHTML += game.awayTeam.teamName;
        gamesEl.innerHTML += ' '
        gamesEl.innerHTML += game.gameDateTimeEst;
        gamesEl.innerHTML += '<br>'
    });
}