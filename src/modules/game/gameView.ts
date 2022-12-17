import { GameSettings, View } from "../../interfaces/interface";
import { GameController } from "./gameController";

export class GameView extends View {
    gameController: GameController;

    constructor(public element: HTMLBodyElement) {
        super(element);
        this.gameController = new GameController();
    }

    public render(props?: string | undefined): void {
        console.log(props);
        this.element.innerHTML = `<p>${props}</p>`;
    }
    public hosts(): void {}

    public listeners(): void {}

    public initialize(props?: string | undefined): void {
        this.render(props);
        this.hosts();
        this.listeners();
    }
}
