import Runner from "./src/Runner.ts";
import GameController from "./src/GameController.ts";
import ActorsEngine from "./src/ActorController.ts";
import Dices from "./src/Games/Dices/index.ts";

const game = new Dices();

(new Runner(
  new GameController(game),
  new ActorsEngine(game),
)).start();
