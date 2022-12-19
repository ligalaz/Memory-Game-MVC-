export interface ICard {
    id: number;
    name: string;
    img: string;
}

export interface IResult {
    playerName: string;
    time: string;
}

export interface IResultMessage {
    message: string;
    time: string;
}

export interface GameSettings {
    playerName: string;
    gameCards: number;
    element: HTMLElement;
}
export interface IProps {
    playerName: string;
    gameField: Array<ICard>;
    timer: string;
}

export abstract class View {
    constructor(public element: HTMLElement) {
        this.element = element;
    }

    public render(props?: IProps): void {}

    public hosts(): void {}
    public listeners(): void {}

    public initialize(props?: IProps): void {}
}
