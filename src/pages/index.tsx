import React, { useEffect, useState } from "react";
import CardDeck from "../components/card-deck/card-deck";
import Dealerhand from "../components/dealer-hand/dealer-hand";
import Playerarea from "../components/player-area/player-area";
import ranks from '../components/card/ranks';
import './styles.scss';


export const IndexPage = () => {
  const numberDecks: number = 8;
  const numberPlayers: number = 5;
  const dealerMinScore: number = 17;
  const bestScore: number = 21;
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

  const initializeGame = (): void => {
    setCardDeck( shuffleDeck( CardDeck( numberDecks ) ) );
  }

  const resetPlayerButtons = (): void => {
    const hitButtons: any = Array.from(document.querySelectorAll('button[id^=hit]'));
    const stayButtons: any = Array.from(document.querySelectorAll('button[id^=stay]'));
    const aceButtons: any = Array.from(document.querySelectorAll('button[id^=ace]'));

    for(const button of hitButtons) {
      button.disabled = false;
    }

    for(const button of stayButtons) {
      button.disabled = false;
    }

    for(const button of aceButtons) {
      button.disabled = false;
    }
  }

  const resetHandStatuses = (): void => {
    const handStatuses: any = Array.from(document.querySelectorAll('.playerArea .area div[id^=hand]'));
    const numHands: number = handStatuses.length;

    for(let i = 0; i < numHands; i++) {
        handStatuses[i].innerHTML = '';
    }
  }

  const handleNewGameClick = () => {
    resetPlayerButtons();
    resetHandStatuses();
    dealCards();
  }

  const handleHitButtonClick = ( event: any ): void => {
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

  const hitDealer = (): any => {
    const playerCards: any = hands.playerHands;
    const dealerCards: any = hands.dealerHand;
    let score: number;

    const handTotal = ( hand: any ): number => {
      let total: number = 0;

      for(const card of hand) {
          total += ranks[card.props.rank]
          if(card.props.rank === 'A') {
              total += 10;
          }
      }

      return total;
    }

    score = handTotal(dealerCards);

    if(score < dealerMinScore) {
      dealerCards.push(cardDeck.shift());

      setHands({
        dealerHand: dealerCards,
        playerHands: playerCards
      });

      return hitDealer();
    }
  }

  const updateHandStatus = (): void => {
    const handStatuses: any = Array.from(document.querySelectorAll('.playerArea .area div[id^=hand]'));
    const playerScores: any = Array.from(document.querySelectorAll('.playerArea div[id^=player-hand] div[id^=score]'));
    const dealerScoreArea: any = document.querySelector('.dealerArea .score');
    const dealerScore: number = parseInt(dealerScoreArea.lastChild.nodeValue);
    const numHands: number = handStatuses.length;
    for(let i = 0; i < numHands; i++) {
      const playerScore: number = parseInt(playerScores[i].lastChild.nodeValue);
      if((playerScore > dealerScore && playerScore <= bestScore) || dealerScore > bestScore) {
        handStatuses[i].innerHTML = 'YOU WON!';
      } else if((playerScore < dealerScore && playerScore <= bestScore) || playerScore > bestScore) {
        handStatuses[i].innerHTML = 'YOU LOST!';
      } else {
        handStatuses[i].innerHTML = 'YOU TIED!';
      }
    }
  }

  const handleStayButtonClick = ( event: any ): void => {
    const stayButtonId: string = event.target.id;
    const hitButtons: any = document.querySelectorAll('button[id^=hit]');
    const dealerScore: any = document.querySelector('.dealerArea .score');
    const dealerFirstCard: any = document.querySelector('.dealerArea .card:first-child .left-corner');
    const player: number = parseInt(stayButtonId[stayButtonId.length - 1]);
    const hitButton: any = document.querySelector(`#hit-button-${player}`);
    const aceButton: any = document.querySelector(`#ace-button-${player}`);
    const stayButton: any = document.querySelector(`#stay-button-${player}`);

    const buttonDisabled = ( button: any ) => button.disabled === true;

    hitButton.disabled = true;
    aceButton.disabled = true;
    stayButton.disabled = true;

    if(Array.from(hitButtons).every(buttonDisabled)) {
      dealerScore.style.visibility = 'visible';
      dealerFirstCard.style.visibility = 'visible';
      hitDealer();
      setTimeout(updateHandStatus, 1000);
    }
  }

  const handleAceButtonClick = ( event: any ): void => {
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
