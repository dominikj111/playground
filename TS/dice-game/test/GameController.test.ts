import { Rhum } from "./testEnvironment/Rhum.ts";
import { assertEquals } from "./testEnvironment/asserts.ts";

import GameController from "../src/GameController.ts";

const mockedGameController = Rhum.mock(GameController).create();

Deno.test("GameController implements the IGameController", () => {
  assertEquals(typeof mockedGameController.onCalculationFinished, "function");
  assertEquals(typeof mockedGameController.startCalculation, "function");
});

