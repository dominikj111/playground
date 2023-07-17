import { IBoard, IGame } from "../../Interfaces.ts";
import Board from "./Board.ts";
import Actor from "./Actor.ts";

export default class implements IGame {
  private gameBoard: IBoard;

  constructor() {
    this.gameBoard = new Board();
  }

  public get Board() {
    return this.gameBoard;
  }

  public get Rules() {
    return [];
  }

  public buildActor() {


    /*

      Na zaklade tohoto pole se bude rozhodovat kolik bude vkladat a jake strategie volit
        - jsou hry, ktere actor nemusi nic vkladat a je hodnocen pouze za volbu strategie
        - actor muze volit jednu strategii, nebo nekolik coz zalezi na hre
        - vklad je pak vracen zpet atorovy

      Vklad je tedy neco jako kredit umoznujici postup, za kombinaci strategie a 
      vkladu actor dostane zpetnou vazbu (vyhra, prohra, remiza).
      Nekdy ovse zalezi na tom jak velka prohra/vyhra nastala, takze se jedna o rozdil oproti tomu co vyhral





      Do hry vracime pole actoru, kterym rekneme jakou strategii a jak vysoky vklad budou volit
      Actor je tedy wrapper hodnot v poli, podle kterych davame vklad a volime strategie.
      Actor pak prochazi evolucnim algoritmem s polu se svymi dalsimi spoluactory

      Na zacatku ma Actor urcity vklad a stategie na ktere sazi v kazdem kole, podle vysledku se 
      puvodni vklad zhodnoti nebo ne.

      Actor svobodne dava vklad a muze bud vsadit vse najednou nebo postupne, kazdopadne pokud nema dostatecny
      minimalni vklad nemuze hrat a konci hru.

      Actori spolu nesouperi a hra ma na startu 0 jako bank, nicmene muze vyplacet kolik je potreba (z banku) - timto 
      muzeme udrzet hru a monitorovat jak vlastne vydelalva bank.



      Zajima nas, jaky actor se udrzi nejdele ve hre. Tzn, kazdy actor je ulozen na disku a zajima nas
      jakou strategii representuje a jake byli jeho uspechy v case.



      Nekdy nas zajima predchozi uspech/neuspech abychom mohli napriklad riskovat vice, proto actor si pamatuje 
      sve predchozi akce a muze je zhodnotit, pokud je ve hre dlouho, primo si pamatuje akce z aktualniho kola a 
      co se tyce predchozich kol, muse pristoupit do database a zhodnotit je. K tomuto bude slouzit board, protoze
      board slouzi i jako log aktivit hracu. Board je aktualni stav "hriste", ovsem v teto konkretni hre nas nezajima
      a zaroven je Board zaznamovym mediem, odkud actor ziskava informace o svych predchozich aktivitach.

      pro uceli evoluce nas zajima jak se actor drzel v kazdem kole a pak i jak se drzel v kazde hre a jaky byl jeho bank
      tzn. ze kaze odehrata hra oznaci kazdeho hrace podle jeho dilcich i absolutniho vysledku kde ukolem je
      maximalizovat jednotlive hodnoty s danou prioritou. Samozrejme priority je soucasti definice actora.

      Actor je tedy

      prostredky, kde
      10000
      je limit pro pocet vkladu, ovsem pokud nastane vyhra, prostredky se zvysi

      field, kde
      [
        strategiea, strategieb, strategiec, vklada,
        strategiea, strategiec, strategiee, vkladb,
        strategiec, strategied, strategiea, vkladc,
        ...
      ]
      
      s tim, ze se vklada cely field, omezene jsou pouze prostredky hrace (pro vklad)

      vysledkem je pak: 
      field (2D pole), ktere nam rekne ktere strategie vyhrali/prohrali a vyhra

      Pro uceli evoluce se vyhodnoti vysledek a actor dostane nalepku, podle ktere se pak v evoluci prokaze
    
    */


    return new Actor();
  }

  /**
   * If false, actors should be able to act till the board is fully occupied.
   * It true, the game controller should the end the round in case there is not enough options to act by all actors.
   * 
   * @returns {boolean}
   */
  public allowFairGame() {
    return false;
  }
}
