import React from 'react';
import PlayerAreaProps from './props';
import Playerhand from "../../components/player-hand/player-hand";
import Playerbutton from "../../components/player-button/player-button";
import Playerscore from "../../components/player-score/player-score";
import playerHandTotal from '../../helper/playerHandTotal';
import ranks from '../card/ranks';
import './styles.scss';

const Playerarea = ({ player, hand, score, handleHitClick, handleStayClick, handleAceClick }: PlayerAreaProps) => {

    return (
        <div className='area'>
            <div id={ `player-buttons-${ player }`} className='buttons'>
                <Playerbutton type='hit' value='hit' player={ player } handleClick={ handleHitClick } />
                <Playerbutton type='stay' value='stand' player={ player } handleClick={ handleStayClick } />
                <Playerbutton type='ace' value='ace = 11' player={ player } handleClick={ handleAceClick } />
            </div>
            <div id={ `handStatus-${ player }` } className='handStatus'></div>
            <div id={ `player-hand-${ player }` } className='handArea'>
                <Playerscore player={ player } score={ score } />
                <Playerhand player={ player } hand={ hand }  />
            </div>
        </div>
    )
};

export default Playerarea;