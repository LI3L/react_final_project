import { makeObservable, observable, computed, action, autorun } from "mobx";
import { getRandomBighead } from "../utils/bigHeadDataRandomizer.js";



export class Players {
  id = 0;
  players = [];
  toPlay = [];

  constructor() {
    makeObservable(this, {
      players: observable,
      addPlayer: action,
      removePlayer: action,
      // addToGame: action,
    });
    autorun(() => console.log(this.players));
  }

  addPlayer(playerName) {
    this.players.push({
      name: playerName,
      id: this.id++,
      img : getRandomBighead(),
    });
 }
  
  removePlayer(playerId) {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  // addToGame(playerId) {
  //   this.players = this.players.map((player) => {
  //     if (player.id === playerId) {
  //       this.toPlay.push(player);
  //     }
  //   });
  // }
}
