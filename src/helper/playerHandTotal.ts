import ranks from "../components/card/ranks";

const playerHandTotal = ( hand: any ): number => {
    let total: number = 0;

    for(const card of hand) {
        total += ranks[card.props.rank]
    }

    return total;
}

export default playerHandTotal;