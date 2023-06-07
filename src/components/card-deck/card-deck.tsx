import React from 'react';
import Card from '../card/card';
import suits from '../card/suits';
import ranks from '../card/ranks';

let deck: any[] = [];

const CardDeck = ( numDecks: number ): any[] => {
    const cardSuits: any = Object.values( suits );
    const cardRanks: any = Object.keys( ranks );

    for(let i = 0; i < numDecks; i++) {
        for(const cardSuit of cardSuits) {
            for(const cardRank of cardRanks) {
                deck = [...deck, <Card key={ `${cardSuit}-${cardRank}-${i}`} suit={ cardSuit } rank={ cardRank } />];
            }
        }
    }

   return deck;
}

export default CardDeck;