import React from 'react';
import PlayerButtonProps from './props';
import './styles.scss';

const Playerbutton = ({ type, player, handleClick, disabledStatus, value }: PlayerButtonProps) => {
    return (
        <>
            <button id={ `${ type }-button-${ player }` } className='button' onClick={ handleClick } disabled={ disabledStatus }>
                { value }
            </button>
        </>
    )
}

export default Playerbutton;