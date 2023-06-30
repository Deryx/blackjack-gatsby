export default interface PlayerAreaProps {
    player: string;
    hand: any;
    score: number;
    handleHitClick(): void;
    handleStayClick(): void;
    handleAceClick(): void;
}