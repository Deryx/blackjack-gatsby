import React from 'react';
import DealerHandProps from './props';
import './styles.scss';

const Dealerhand = ({ hand }: DealerHandProps) => {
    return (
        <div className='cards'>
            { hand }
        </div>
    )
};

export default Dealerhand;