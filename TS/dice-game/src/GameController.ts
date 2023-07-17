import { Event, IListener } from "./InterfacesEvents.ts";
import { IActor, IGame, IGameController } from "./Interfaces.ts";

export default class implements IGameController {
  private onCalculationFinishedEvent: Event<void> = new Event();
  private switcherFairGame: boolean;

  constructor(private game: IGame) {
    this.game = game;
    this.switcherFairGame = this.game
      .allowFairGame();
  }

  onCalculationFinished(listener: IListener<void>): void {
    this.onCalculationFinishedEvent.add(listener);
  }

  startCalculation(actors: IActor[]): void {
    let boardStillHasSpace = actors.length !== 0;
    let boardStillHasSpaceForAllActorsToAct = !this.switcherFairGame ||
      (this.game.Board.freeSpace() >= actors.length);

    do {
      this.game.Board.startRound();

      for (
        let i = 0;
        i < actors.length && boardStillHasSpace &&
        boardStillHasSpaceForAllActorsToAct;
        i += 1
      ) {
        actors[i].act(this.game.Board, this.game.Rules);
        boardStillHasSpace = this.game.Board.freeSpace() !== 0;
        boardStillHasSpaceForAllActorsToAct = !this.switcherFairGame ||
          (this.game.Board.freeSpace() >= actors.length);
      }
    } while (boardStillHasSpace && boardStillHasSpaceForAllActorsToAct);

    this.onCalculationFinishedEvent.trigger();
  }
}
