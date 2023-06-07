import React, { useState } from "react";
import CardDeck from "../components/card-deck/card-deck";
import Dealerhand from "../components/dealer-hand/dealer-hand";
import Playerarea from "../components/player-area/player-area";
import './styles.scss';


export const IndexPage = () => {
  const numberDecks: number = 8;
  const numberPlayers: number = 5;
  const initialCards: number = 2;

  let [hands, setHands] = useState({
    dealerHand: [],
    playerHands: []
  });
  let playerAreas: any[] = [];
  let arrayIndex: number = 0;
  let cardDeck: any;

  const generateRandomNumber = ( maxNumber: number ): number => {
    return Math.floor( Math.random() * maxNumber );
  }

  const generateRandomNumberArray = ( arrayLength: number,
                                      maxNumber: number,
                                      numberArray: number[] ): number[] => {
    if( arrayIndex < arrayLength ) {
      let randomNumber: number = generateRandomNumber( maxNumber );

      numberArray = [...numberArray, randomNumber];
      arrayIndex++;

      return generateRandomNumberArray( arrayLength, maxNumber, numberArray);
    } else {
      arrayIndex = 0;

      return numberArray;
    }
  }

  const shuffleDeck = ( deck: any[] ): any => {
    const deckLength: number = deck && deck.length;
    console.log(deckLength);
    let shuffledDeck: any = [];
    let shuffledArray: number[] = [];

    shuffledArray = generateRandomNumberArray( deckLength, deckLength - 1, shuffledArray );

    for(let i = 0; i < deckLength; i++) {
      const shuffledIndex: number = shuffledArray[i];
      shuffledDeck = [...shuffledDeck, deck[shuffledIndex]];
    }

    return shuffledDeck;
  }

  const dealCards = ( deck: any[] ): void => {
    let dealerhand: any[] = [];
    let playerhands: any = [];

    for(let i = 0; i < numberPlayers; i++) {
      playerhands = [...playerhands, []];
    }

    for(let i = 0; i < initialCards; i++) {
      for(let j = 0; j < numberPlayers; j++) {
        playerhands[j] = [...playerhands[j], deck.shift()];
      }

      dealerhand = [...dealerhand, deck.shift()];
    }

    hands = {
      dealerHand: dealerhand,
      playerHands: playerhands
    }

    setHands( hands );
  }

  const initializeGame = () => {
    cardDeck = CardDeck( numberDecks );
    cardDeck = shuffleDeck( cardDeck );
  }

  const handleNewGameClick = ( event: any ) => {
    dealCards( cardDeck );
    console.log(hands);
  }

  initializeGame();

  return (
    <div className="table">
      <div className="dealerArea">
        <Dealerhand key='dealer' hand={ hands.dealerHand } />
      </div>
      <div className='newGameButton'>
        <button onClick={ handleNewGameClick }>new game</button>
      </div>
      <div className="playerArea">
        { hands.playerHands && hands.playerHands.map( (hand, index) => <Playerarea key={ `player-${ index }`} player={ index } hand={ hand } />) }
      </div>
    </div>
  )
}

export default IndexPage;
