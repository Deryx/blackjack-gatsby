export default interface PlayerButtonProps {
    type: string;
    player: string;
    handleClick(): void;
    disabledStatus: boolean;
    value: string;
}