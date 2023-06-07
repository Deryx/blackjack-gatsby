import React from 'react';
import CardProps from './props';
import suits from './suits';
import './styles.scss';

const Card = ( { rank, suit }: CardProps ) => {
    let cardClass: any = [ 'card' ];
    cardClass.push( ( suit === suits[ 'diamond' ] || suit === suits[ 'heart' ] ) ? 'red' : 'black' );
    cardClass = cardClass.join( ' ' );

    return (
        <div className={ cardClass }>
            <div className='left-corner'>
                <div>{ rank }</div>
                <div>{ suit }</div>
            </div>
            <div className='right-corner'>
                <div className='inverted'>{ rank }</div>
                <div className='inverted'>{ suit }</div>
            </div>
        </div>
    )
}

export default Card;