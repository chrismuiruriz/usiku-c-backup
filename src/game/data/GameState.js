export default class GameState {
  /*
    Rounds:
        Round 1:
            - Player 1:
            - Player 2:
            - Player 3:
            - Player 4:
        Round 2:
            - Player 1:
            - Player 2:
            - Player 3:
            - Player 4:
        Round 3:
            - Player 1:
            - Player 2:
            - Player 3:
            - Player 4:
        Round 4:
            - Player 1:
            - Player 2:
            - Player 3:
            - Player 4:
    */

  constructor() {
    //set currentRound to localStorage round or 1 if not set
    this.currentRound = localStorage.getItem("currentRound") || 1;
  }

  getCurrentRound() {
    return parseInt(this.currentRound);
  }

  setCurrentRound(round) {
    this.currentRound = round;
    localStorage.setItem("currentRound", round);
  }

  setPlayerRoundScore(player, round, score) {
    let label = `round_${round}_player_${player}_score`;
    let newScore = localStorage.getItem(label)
      ? parseInt(localStorage.getItem(label)) + score
      : score;

    localStorage.setItem(label, newScore);
  }

  getPlayerRoundScore(player, round) {
    let label = `round_${round}_player_${player}_score`;
    return localStorage.getItem(label) || 0;
  }

  setRoundStar(round, star) {
    let label = `round_${round}_star`;
    let newStar = localStorage.getItem(label)
      ? parseInt(localStorage.getItem(label))
      : star;

    localStorage.setItem(label, newStar);
  }

  getRoundStar(round) {
    let label = `round_${round}_star`;
    return localStorage.getItem(label)
      ? parseInt(localStorage.getItem(label))
      : 0;
  }

  getGroupScores() {
    let groupScore = 0;
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 4; j++) {
        groupScore += parseInt(this.getPlayerRoundScore(j, i));
      }
    }
    return groupScore;
  }

  getRoundScores(round) {
    let roundScore = 0;
    for (let i = 1; i <= 4; i++) {
      roundScore += parseInt(this.getPlayerRoundScore(i, round));
    }
    return roundScore;
  }

  //clear all localStorage
  resetScores() {
    localStorage.clear();
  }
}
