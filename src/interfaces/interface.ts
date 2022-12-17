export interface ICard {
    id: number;
    name: string;
    img: string;
}

export interface IResult {
    name: string;
    time: Date;
}

export interface GameSettings {
    playerName: string;
    gameCards: number;
    element: HTMLElement;
}

export abstract class View {
    constructor(public element: HTMLElement) {
        this.element = element;
    }

    public render(props?: string): void {}

    public hosts(): void {}
    public listeners(): void {}

    public initialize(props?: string): void {}
}
