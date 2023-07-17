import { Event, IListener } from "./InterfacesEvents.ts";
import { IActor, IActorController, IGame } from "./Interfaces.ts";

export default class implements IActorController {
  private onActorsReadyEvent: Event<IActor[]> = new Event();
  private currentActors: IActor[] = [];

  constructor(private game: IGame) {
    this.game = game;
  }

  onActorsReady(listener: IListener<IActor[]>): void {
    this.onActorsReadyEvent.add(listener);
  }

  prepareNextActors(): void {
    this.currentActors = new Array(this.game.Board.slotCount()).fill(undefined)
      .map(() => this.game.buildActor());
    this.onActorsReadyEvent.trigger(this.currentActors);
  }
}
