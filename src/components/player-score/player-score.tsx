import React from 'react';
import PlayerScoreProps from './props';
import './styles.scss';

const Playerscore = ({ player, score }: PlayerScoreProps ) => {
    return (
        <div id={ `score-player-${ player }`} className='score'>
            <label>score: </label>
            { score }
        </div>
    )
}

export default Playerscore;