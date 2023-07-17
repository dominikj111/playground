import { IBoard } from "../../Interfaces.ts";

export default class implements IBoard {
  constructor() {}

  startRound() {
    // it will clear the board to run the round
  }

  freeSpace() {
    // it returns how much space letf in current round
    // the value which returns also means the count of possible actor's acts
    // some game may allow to actors to play even there is not enough space to play them all in current round
    return 1;
  }

  slotCount() {
    return 5;
  }
}
