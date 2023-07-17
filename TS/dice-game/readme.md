TODO: 

1. make actor generation (Game object contains the actor builder) and generation is actually result of the genetic programming modifications ... again the Game object knows how to cross actors for an example, how to mutate them and so on ... also it may be testt app to test the specific algorithm upon the game, so no evolution is needed but just specific implemented actors
for evolution algo use the library!
https://github.com/bermi/genetic

2. do calculation upon Board x Actor


NOTES:
Games/Dices/index.ts -> Game object
. is the gateway to make an actor, interact with board and apply the rule
. actor cannot be able to modify the rule nor board ... he will get the board clone (what is essentially the game log) and clone of the gamerules and game controller will ask what action actors want to do ... to prevent often cloning ... there will be board record in two stages ... one is test record and next is hard record where the test record will be tested and once non corruption happend, the action will be accepted. ... DiceGame object is responsible to test the board consistency as it would be interesting to implement in the future the actors voting if the board is consistent (similar to the blockchain).


The result would be build to be use in the CLI at the moment, but in future it may be in browser solution
+ three.js

// gamerule object is responsible to provide all possible moves upon the board.

// let any player to act player.act = (board, gamerules): move

// player will decide what move is good and will trigger it ....
// player has not any knowledge about the game, but he can pick any move from the gameRules array
// and return the move object ... move object is transformation the board from one state to another

// kostkam staci pouze loger, predchozi stav hry nikoho nezajima, takze jde jen o playera, ktery sazi
// sazka je volba itemu z gamerules array jako volba strategie a sazka ....
// uzivatel muze vybrat ruzne strategie a za kazdou plati
// to znamena, ze hrac rekne co bude delat a pokud zadny dalsi hrac nemusi cekat na ostatni hrace, ucini tak vsichni
// Game class implementace pak losuje nahohodna cisla a vyhodnoti volbu hracu, ulozi si vklad a vyplati vyhry

// tady probiha hra vech uzivatelu dokud hra neskonci
// nebylo by spatne spawn another thread