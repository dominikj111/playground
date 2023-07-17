import { IListener } from "./InterfacesEvents.ts";

export interface IRule {
  (board: IBoard): IBoard;
}

export interface IBoard {
  freeSpace(): number;
  slotCount(): number;
  startRound(): void;
}

export interface IGame {
  get Board(): IBoard;
  get Rules(): IRule[];
  buildActor(): IActor;
  allowFairGame(): boolean;
}

export interface IActor {
  act(board: IBoard, rules: IRule[]): void;
}

export interface IGameController {
  onCalculationFinished(listener: IListener<void>): void;
  startCalculation(actors: IActor[]): void;
}

export interface IActorController {
  onActorsReady(listener: IListener<IActor[]>): void;
  prepareNextActors(): void;
}
