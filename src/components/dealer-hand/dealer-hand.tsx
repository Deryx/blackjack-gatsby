import React from 'react';
import DealerHandProps from './props';
import dealerHandTotal from '../../helper/dealerHandTotal';
import ranks from '../card/ranks';
import './styles.scss';

const Dealerhand = ({ hand }: DealerHandProps) => {
    return (
        <>
            <div id='dealer-score' className='score'>
                <label>score: </label>
                { dealerHandTotal(hand) }
            </div>
            <div className='cards'>
                { hand }
            </div>
        </>
    )
};

export default Dealerhand;