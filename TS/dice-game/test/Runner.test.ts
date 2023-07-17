import { Rhum } from "./testEnvironment/Rhum.ts";
import { assertEquals, assert } from "./testEnvironment/asserts.ts";

import Runner from "../src/Runner.ts";
import GameController from "../src/GameController.ts";
import PlayersEngine from "../src/ActorController.ts";

const mockedGameController = Rhum.mock(GameController).create();
const mockedPlayersEngine = Rhum.mock(PlayersEngine).create();
const mockedRunner = Rhum.mock(Runner).withConstructorArgs(
  mockedGameController,
  mockedPlayersEngine,
).create();

Deno.test("The Runner has a start function", () => {
  assertEquals(typeof mockedRunner.start, "function");
});

Deno.test("The Runner starts the calculation", () => {
  let startCalculationCalled = false;
  mockedGameController.startCalculation = () => { startCalculationCalled = true; };
  mockedRunner.start();
  assertEquals(mockedPlayersEngine.calls.prepareNextGeneration, 1);
  assert(startCalculationCalled);
});
