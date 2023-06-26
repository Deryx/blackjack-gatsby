import ranks from "../components/card/ranks";

const dealerHandTotal = ( hand: any ): number => {
    let total: number = 0;

    if(Array.isArray(hand)) {
        for(const card of hand) {
            total += ranks[card.props.rank]
            if(card.props.rank === 'A') {
                total += 10;
            }
        }
    }

    return total;
}

export default dealerHandTotal;