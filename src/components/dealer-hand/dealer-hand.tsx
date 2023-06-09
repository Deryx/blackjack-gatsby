import React from 'react';
import DealerHandProps from './props';
import ranks from '../card/ranks';
import './styles.scss';

const Dealerhand = ({ hand }: DealerHandProps) => {
    const handTotal = ( hand: any ): number => {
        let total: number = 0;

        for(const card of hand) {
            total += ranks[card.props.rank]
        }

        return total;
    }

    return (
        <>
            <div id='dealer-score' className='score'>
                <label>score: </label>
                { handTotal(hand) }
            </div>
            <div className='cards'>
                { hand }
            </div>
        </>
    )
};

export default Dealerhand;