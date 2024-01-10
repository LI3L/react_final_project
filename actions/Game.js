import { makeObservable, observable, computed, action, autorun } from "mobx";
import { Words } from "../utils/Words.js";

export class Game {
  id = 0;
  playersInGame = [];
  randomWord = "";
  wordToGuess = "";
  intervalId = null;
  delay = 1000;

  constructor() {
    makeObservable(this, {
      wordToGuess: observable,
      delay: observable,
      intervalId: observable,
      randomWord: observable,
      playersInGame: observable,
      removePlayer: action,
      addToGame: action,
      guessLetter: action,
      addLetter: action,
      addScore: action,
      createRandomWord: action,
      getRandomPlayer: action,
      createWordToGuess: action,
      checkLetter: action,
      checkEndGame: action,
      startGame: action,
      createInterval: action,
    });
    autorun(() => console.log(this.playersInGame));
  }
  createInterval() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      const player = this.getRandomPlayer();
      const letter = this.guessLetter(player);
      if (this.checkLetter(letter)) {
        
        console.log("wordToGuess", this.wordToGuess);
        let wordArray = this.wordToGuess.split("");
        for (let i = 0; i < this.randomWord.length; i++) {
          if (this.randomWord[i] === letter) {
            this.addScore(player);
            wordArray[i] = letter;
          }
        }
        this.wordToGuess = wordArray.join("");
      }
      this.addLetter(player, letter);

      if (this.checkEndGame()) {
        clearInterval(this.intervalId);
        console.log("Game over! Interval stopped.");
      }
    }, this.delay);
  }

  startGame() {
    if(this.playersInGame){
      this.playersInGame.map((player) => {
        player.chars = "";
        player.score = 0;
      });
    }
    this.createRandomWord();
    this.createWordToGuess();
    this.createInterval();
  }

  createRandomWord() {
    console.log("interval created");
    this.randomWord = Words[Math.floor(Math.random() * Words.length)];
  }

  checkEndGame() {
    if (this.wordToGuess.includes("_")) return false;
    return true;
  }

  checkLetter(letter) {
    if (this.randomWord.includes(letter)) return true;
    return false;
  }

  createWordToGuess() {
    this.wordToGuess = this.randomWord
      .split("")
      .map((letter) => "_")
      .join("");
  }

  getRandomPlayer() {
    return this.playersInGame[
      Math.floor(Math.random() * this.playersInGame.length)
    ];
  }

  addScore(player) {
    this.playersInGame.find((p) => p.id === player.id).score += 1;
    // player.score+=1;
  }
  addLetter(player, letter) {
    if(player.chars.includes(letter)) return;
    player.chars += letter + ", ";
  }

  guessLetter(player) {
    let letter = "";
    letter = String.fromCharCode(
      Math.floor(Math.random() * (122 - 97 + 1)) + 97
    );
    this.addLetter(player, letter);
    return letter;
  }

  removePlayer(playerId) {
    this.playersInGame = this.playersInGame.filter(
      (player) => player.id !== playerId
    );
  }

  addToGame(playerToPlay) {
    this.playersInGame.push({ ...playerToPlay, chars: "", score: 0 });
  }
}
