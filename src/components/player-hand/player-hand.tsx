import React from 'react';
import PlayerHandProps from './props';
import './styles.scss';

const Playerhand = ({ player, hand }: PlayerHandProps) => {
    return (
        <div id={ `player-${player}`} className='cards'>
            { hand }
        </div>
    )
}

export default Playerhand;