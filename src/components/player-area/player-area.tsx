import React from 'react';
import PlayerAreaProps from './props';
import Playerhand from "../../components/player-hand/player-hand";
import Playerbutton from "../../components/player-button/player-button";
import Playerscore from "../../components/player-score/player-score";
import ranks from '../card/ranks';
import './styles.scss';

const Playerarea = ({ player, hand }: PlayerAreaProps) => {
    const handleHitClick = ( event: any ) => {

    }

    const handleStayClick = ( event: any ) => {

    }

    const handleAceClick = ( event: any ) => {

    }

    const handTotal = ( hand: any ): number => {
        console.log(hand);
        let total: number = 0;
        // for(let i = 0; i < hand.length; i++) {
        //     let card: any = hand[i].rank;
        //     total += ranks[card];
        // }

        return total;
    }

    return (
        <div className='area'>
            <div id={ `player-buttons-${ player }`} className='buttons'>
                <Playerbutton type='hit' value='hit' player={ player } handleClick={ handleHitClick } />
                <Playerbutton type='stay' value='stay' player={ player } handleClick={ handleStayClick } />
                <Playerbutton type='ace' value='make ace 11' player={ player } handleClick={ handleAceClick } />
            </div>
            <div id={ `handStatus-${ player }` } className='handStatus'></div>
            <div id={ `player-hand-${ player }` } className='handArea'>
                <Playerscore player={ player } score={ handTotal( hand ) } />
                <Playerhand player={ player } hand={ hand }  />
            </div>
        </div>
    )
};

export default Playerarea;