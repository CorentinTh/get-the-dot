/**
 * Created by Corentin THOMASSET on 12/02/2018.
 */

class Leaderboard {

    constructor() {

    }

    getSortedScores() {
        let sortedScores = [];

        for (let socketID in otherPlayers) {
            if (otherPlayers.hasOwnProperty(socketID)) {
                let player = otherPlayers[socketID];

                sortedScores.push({
                    pseudo: player.pseudo,
                    score: player.score,
                    isCurrentPlayer: false
                })
            }
        }

        if (currentPlayer.canPlay) {
            sortedScores.push({
                pseudo: currentPlayer.pseudo,
                score: currentPlayer.score,
                isCurrentPlayer: true
            });
        }

        return sortedScores.sort(function (a, b) {
            return b.score - a.score;
        });
    }

    printLeaderboard() {
        let sortedScore = this.getSortedScores();


        for (let i = 0; i < sortedScore.length; i++) {
            let score = sortedScore[i];

            fill(score.isCurrentPlayer ? 'rgba(24, 188, 156, 0.8)' : 'rgba(255, 255, 255, 0.6)');
            text(score.score + ' - ' + score.pseudo, 10, (i + 1) * 20);
        }
    }
}