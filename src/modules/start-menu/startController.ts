import { GameSettings } from "../../interfaces/interface";
import { StartModel } from "./startModel";

export class StartController {
    startModel: StartModel;
    constructor() {
        this.startModel = new StartModel();
    }

    public startGame(gameSettings: GameSettings): void {
        this.startModel.activateGameView(gameSettings.element as HTMLBodyElement, gameSettings.playerName, gameSettings.gameCards);
    }
}
