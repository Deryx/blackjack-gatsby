import React, { useEffect, useState } from "react";
import CardDeck from "../components/card-deck/card-deck";
import Dealerhand from "../components/dealer-hand/dealer-hand";
import Playerarea from "../components/player-area/player-area";
import './styles.scss';


export const IndexPage = () => {
  const numberDecks: number = 8;
  const numberPlayers: number = 5;
  const initialCards: number = 2;
  const [cardDeck, setCardDeck] = useState([]);

  let [hands, setHands] = useState({
    dealerHand: [],
    playerHands: []
  });
  let arrayIndex: number = 0;

  useEffect(() => {
    initializeGame();
  }, []);

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
    let shuffledDeck: any = [];
    let shuffledArray: number[] = [];

    shuffledArray = generateRandomNumberArray( deckLength, deckLength - 1, shuffledArray );

    for(let i = 0; i < deckLength; i++) {
      const shuffledIndex: number = shuffledArray[i];
      shuffledDeck = [...shuffledDeck, deck[shuffledIndex]];
    }

    return shuffledDeck;
  }

  const dealCards = (): void => {
    let dealerhand: any[] = [];
    let playerhands: any = [];

    for(let i = 0; i < numberPlayers; i++) {
      playerhands = [...playerhands, []];
    }

    for(let i = 0; i < initialCards; i++) {
      for(let j = 0; j < numberPlayers; j++) {
        playerhands[j] = [...playerhands[j], cardDeck.shift()];
      }

      dealerhand = [...dealerhand, cardDeck.shift()];
    }

    hands = {
      dealerHand: dealerhand,
      playerHands: playerhands
    }

    setHands( hands );
  }

  const initializeGame = () => {
    setCardDeck( shuffleDeck( CardDeck( numberDecks ) ) );
  }

  const handleNewGameClick = () => {
    dealCards();
  }

  const handleHitButtonClick = ( event: any ) => {
    const hitButtonId: string = event.target.id;
    const player: number = parseInt(hitButtonId[hitButtonId.length - 1]);
    const dealerhand: any = hands.dealerHand;
    let playerCards: any = hands.playerHands;
    let playerHand: any = hands.playerHands[player];
    playerHand = [...playerHand, cardDeck.shift()];
    playerCards[player] = playerHand;
    setHands({
      dealerHand: dealerhand,
      playerHands: playerCards
    });
  }

  const handleStayButtonClick = ( event: any ) => {
    const stayButtonId: string = event.target.id;
    const player: number = parseInt(stayButtonId[stayButtonId.length - 1]);
    const hitButton: any = document.querySelector(`#hit-button-${player}`);
    hitButton.disabled = true;
  }

  const handleAceButtonClick = ( event: any ) => {
    const aceButtonId: string = event.target.id;
    const player: number = parseInt(aceButtonId[aceButtonId.length - 1]);
    const aceButton: any = document.querySelector(`#ace-button-${player}`);
    const playerHand: any = hands.playerHands[player];
    const playerScore: any = document.querySelector(`#score-player-${player}`)?.lastChild;
    let score: number = parseInt(playerScore.nodeValue);
    let hasAce: boolean = false;

    for(const card of playerHand) {
      if(card.props.rank.includes('A')) {
        hasAce = true;
      }
    }

    if(!!hasAce) {
      playerScore.nodeValue = (score + 10).toString();
      aceButton.disabled = true;
    }
  }

  return (
    <div className="table">
      <div className="dealerArea">
        <Dealerhand key='dealer' hand={ hands.dealerHand } />
      </div>
      <div className='newGameButton'>
        <button onClick={ handleNewGameClick }>new game</button>
      </div>
      <div className="playerArea">
        { hands.playerHands && hands.playerHands.map( (hand, index) => <Playerarea key={ `player-${ index }`} player={ index } hand={ hand } handleHitClick={ handleHitButtonClick } handleStayClick={ handleStayButtonClick } handleAceClick={ handleAceButtonClick } />) }
      </div>
    </div>
  )
}

export default IndexPage;
