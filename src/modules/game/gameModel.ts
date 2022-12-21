import { sortingByTime } from "../../interfaces/constants";
import { IResult, IResultMessage, leaderBoard } from "../../interfaces/interface";

export class GameModel {
    public compareContainer: Array<string>;
    public guessedContainer: Array<string>;
    public winnersContainer: leaderBoard;
    public guessedValue: number;
    public timerValue: number;
    public currentTimerTime: number;
    public isTimerStarted = false;

    constructor() {
        this.compareContainer = [];
        this.guessedContainer = [];
        this.winnersContainer = [];
    }

    public addCardsForCompare(id: string): void {
        this.compareContainer.push(id);
    }

    public addGuessedCard(id: string): void {
        this.guessedContainer.push(id);
    }

    public compareCards(): boolean {
        return this.compareContainer[0] === this.compareContainer[1] ? true : false;
    }

    public searchGuessed(id: string): boolean {
        return this.guessedContainer.includes(id);
    }

    public timerActivate(): void {
        const timerId = setInterval(() => {
            this.currentTimerTime--;
            if (!this.currentTimerTime || !this.isTimerStarted) {
                clearInterval(timerId);
            }
        }, 1000);
    }

    public checkWin(playerName: string): IResultMessage {
        if (this.currentTimerTime >= 0 && this.guessedContainer.length === this.guessedValue) {
            this.saveWinner({ playerName, time: this.gameEndTime(this.timerValue, this.currentTimerTime) });
            return {
                message: `You win`,
                time: this.gameEndTime(this.timerValue, this.currentTimerTime),
            };
        } else if (this.currentTimerTime === 0 && this.guessedContainer.length < this.guessedValue) {
            return {
                message: `You loss`,
                time: this.gameEndTime(this.timerValue, this.currentTimerTime),
            };
        } else {
            return {
                message: `Game no ended`,
                time: this.gameEndTime(this.timerValue, this.currentTimerTime),
            };
        }
    }

    public gameEndTime(startTime: number, endTime: number): string {
        return `${startTime - endTime}s`;
    }

    public saveWinner(result: IResult): void {
        this.transformResultTable(result);
        window.localStorage.setItem("winners", JSON.stringify(this.winnersContainer));
    }

    public transformResultTable(result: IResult): void {
        this.winnersContainer = JSON.parse(localStorage.getItem("winners") as string) || [];
        (this.winnersContainer as Array<IResult>).push(result);
        this.winnersContainer = sortingByTime(this.winnersContainer as Array<IResult>);
        this.winnersContainer = this.winnersContainer.length === 11 ? this.winnersContainer.slice(1) : this.winnersContainer;
    }
}
