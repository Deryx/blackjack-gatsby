export default interface PlayerAreaProps {
    player: string;
    hand: any;
    handleHitClick(): void;
    handleStayClick(): void;
    handleAceClick(): void;
}