import { IResultMessage } from "../../interfaces/interface";
import { GameModel } from "./gameModel";

export class GameController {
    public gameModel: GameModel;
    constructor() {
        this.gameModel = new GameModel();
    }

    public setModelSettings(value: number, timer: string): void {
        this.gameModel.guessedValue = value;
        this.gameModel.timerValue = Number(timer);
        this.gameModel.currentTimerTime = Number(timer);
        this.gameModel.isTimerStarted = true;
    }

    public setTimer(): void {
        this.gameModel.timerActivate();
    }

    public getTimer(): string {
        return String(this.gameModel.currentTimerTime);
    }

    public getWin(playerName: string): IResultMessage {
        return this.gameModel.checkWin(playerName);
    }

    public currentCompareLength(): number {
        return this.gameModel.compareContainer.length;
    }
    public checkGuessed(id: string): boolean {
        return this.gameModel.searchGuessed(id);
    }

    public checkCard(id: string): string {
        switch (this.currentCompareLength()) {
            case 0:
                this.gameModel.addCardsForCompare(id);
                return this.gameModel.compareContainer[0];
                break;
            case 1:
                this.gameModel.addCardsForCompare(id);
                if (this.gameModel.compareCards()) {
                    this.gameModel.addGuessedCard(id);
                    this.gameModel.compareContainer = [];
                    return id;
                } else {
                    const currentId = this.gameModel.compareContainer[0];
                    this.gameModel.compareContainer = [];
                    return currentId;
                }
                break;
            default:
                return id;
                break;
        }
    }
}
