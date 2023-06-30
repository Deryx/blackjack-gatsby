import React, { useEffect, useState } from "react";
import CardDeck from "../components/card-deck/card-deck";
import Dealerhand from "../components/dealer-hand/dealer-hand";
import Playerarea from "../components/player-area/player-area";
import dealerHandTotal from "../helper/dealerHandTotal";
import playerHandTotal from "../helper/playerHandTotal";
import './styles.scss';
import Playerscore from "../components/player-score/player-score";


export const IndexPage = () => {
  const numberDecks: number = 8;
  const numberPlayers: number = 5;
  const dealerMinScore: number = 17;
  const bestScore: number = 21;
  const initialCards: number = 2;
  const [cardDeck, setCardDeck] = useState([]);

  let [hands, setHands] = useState({
    dealer: {
      hand: [],
      score: 0
    },
    players: []
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
    let dealerHand: any = [];
    let dealr: any = {};
    let playerHands: any = [];
    let plyrs: any = [];

    for(let i = 0; i < numberPlayers; i++) {
      playerHands = [...playerHands, []];
    }

    for(let i = 0; i < initialCards; i++) {
      for(let j = 0; j < numberPlayers; j++) {
        let newCard = cardDeck.shift();
        playerHands[j] = [...playerHands[j], newCard];
      }

      dealerHand = [...dealerHand, cardDeck.shift()];
    }

    dealr.hand = dealerHand;
    dealr.score = dealerHandTotal(dealerHand);

    for(const hand of playerHands) {
      const player: any = {};
      player.hand = hand;
      player.score = playerHandTotal(hand);
      plyrs = [...plyrs, player];
    }

    hands = {
      dealer: dealr,
      players: plyrs
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
    const currentDealer: any = hands.dealer;
    const currentPlayer: any = hands.players[player];
    const hitButtons: any = document.querySelectorAll('button[id^=hit]');
    const hitButton: any = document.querySelector(`#hit-button-${player}`);
    const stayButton: any = document.querySelector(`#stay-button-${player}`);
    const aceButton: any = document.querySelector(`#ace-button-${player}`);

    const dealerScore: any = document.querySelector('.dealerArea .score');
    const dealerFirstCard: any = document.querySelector('.dealerArea .card:first-child .left-corner');
    let updatedPlayers: any = hands.players;

    const buttonDisabled = ( button: any ) => button.disabled === true;

    const newCard: any = cardDeck.shift();
    currentPlayer.hand = [...currentPlayer.hand, newCard];
    currentPlayer.score = (buttonDisabled(aceButton)) ? currentPlayer.score += 10 : currentPlayer.score + playerHandTotal([newCard]);
    updatedPlayers[player] = currentPlayer;

    hands = {
      dealer: currentDealer,
      players: updatedPlayers
    }

    setHands(hands);

    if(currentPlayer.score > bestScore) {
      hitButton.disabled = true;
      stayButton.disabled = true;
      aceButton.disabled = true;

      if(Array.from(hitButtons).every(buttonDisabled)) {
        dealerScore.style.visibility = 'visible';
        dealerFirstCard.style.visibility = 'visible';
        hitDealer();
        setTimeout(updateHandStatus, 1000);
      }
    }
  }

  const hitDealer = (): any => {
    const currentPlayers: any = hands.players;
    const currentDealer: any = hands.dealer;
    let score: number;

    score = dealerHandTotal(currentDealer.hand);

    if(score <= dealerMinScore) {
      currentDealer.hand.push(cardDeck.shift());
      currentDealer.score = dealerHandTotal(currentDealer.hand);

      setHands({
        dealer: currentDealer,
        players: currentPlayers
      });

      return hitDealer();
    }
  }

  const updateHandStatus = (): void => {
    const handStatuses: any = Array.from(document.querySelectorAll('.playerArea .area div[id^=hand]'));
    const dealerScore: number = hands.dealer.score;
    const numHands: number = handStatuses.length;

    for(let i = 0; i < numHands; i++) {
      let currentPlayer: any = hands.players[i];
      let playerScore: number = currentPlayer.score;
      let uiScoreArea: any = document.querySelector(`#score-player-${i}`)?.lastChild; 
      let uiScore: number = uiScoreArea && parseInt(uiScoreArea.nodeValue);
      playerScore = (uiScore > playerScore) ? uiScore : playerScore;

      if((playerScore > dealerScore && playerScore <= bestScore) || (dealerScore > bestScore && playerScore <= bestScore)) {
        handStatuses[i].innerHTML = 'YOU WON!';
      } else if((playerScore < dealerScore && playerScore < bestScore) || playerScore > bestScore) {
        handStatuses[i].innerHTML = 'YOU LOST!';
      } else if(playerScore === dealerScore) {
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
    const playerNumber: number = parseInt(aceButtonId[aceButtonId.length - 1]);
    const currentDealer: any = hands.dealer;
    const updatedPlayers: any = hands.players;
    const aceButton: any = document.querySelector(`#ace-button-${playerNumber}`);
    const playerScore: any = document.querySelector(`#score-player-${playerNumber}`)?.lastChild;  
    const player: any = hands.players[playerNumber];

    let hasAce: boolean = false;

    for(const card of player.hand) {
      if(card.props.rank.includes('A')) {
        hasAce = true;
      }
    }

    if(!!hasAce) {
      player.score += 10;

      setHands({
        dealer: currentDealer,
        players: updatedPlayers
      });

      aceButton.disabled = true;
      playerScore.nodeValue = player.score.toString();
    }

    updatedPlayers[playerNumber] = player;
  }

  return (
    <div className="table">
      <div className="dealerArea">
        <Dealerhand key='dealer' hand={ hands.dealer.hand } />
      </div>
      <div className='newGameButton'>
        <button onClick={ handleNewGameClick }>new game</button>
      </div>
      <div className="playerArea">
        { hands.players && hands.players.map( (player, index) => <Playerarea key={ `player-${ index }`} player={ index.toString() } score={ player.score } hand={ player.hand } handleHitClick={ handleHitButtonClick } handleStayClick={ handleStayButtonClick } handleAceClick={ handleAceButtonClick } />) }
      </div>
    </div>
  )
}

export default IndexPage;
