import { IResultMessage } from "../../interfaces/interface";
import { PauseView } from "../pause-menu/pauseView";
import { GameModel } from "./gameModel";

export class GameController {
    public gameModel: GameModel;
    public pauseView: PauseView;
    constructor() {
        this.gameModel = new GameModel();
    }

    public setModelSettings(value: number, timer: string): void {
        this.gameModel.guessedValue = value;
        this.gameModel.timerValue = Number(timer);
        this.gameModel.currentTimerTime = Number(timer);
    }

    public setTimer(pause: boolean): void {
        this.gameModel.isTimerStarted = pause ? false : true;
        pause ? null : this.gameModel.timerActivate();
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

    public pauseMenuActive(element: HTMLElement, gameElement: HTMLBodyElement): void {
        this.pauseView = new PauseView(element, gameElement);
        this.pauseView.initialize();
    }

    public newGame(): void {
        this.pauseView.newGameView();
    }

    public restartGame(): void {
        this.pauseView.restartView();
    }
}
