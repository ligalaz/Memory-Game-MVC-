export class GameModel {
    public compareContainer: Array<string>;
    public guessedContainer: Array<string>;
    public guessedValue: number;
    constructor() {
        this.compareContainer = [];
        this.guessedContainer = [];
    }

    public checkWin(): boolean {
        return this.guessedContainer.length === this.guessedValue ? true : false;
    }

    public saveWinner(playerName: string, time: number): void {
        window.localStorage.setItem("winners", JSON.stringify({ playerName, time }));
    }

    public compareCards(): boolean {
        return this.compareContainer[0] === this.compareContainer[1] ? true : false;
    }

    public addCardsForCompare(id: string): void {
        this.compareContainer.push(id);
    }

    public addGuessedCard(id: string): void {
        this.guessedContainer.push(id);
    }

    public searchGuessed(id: string): boolean {
        return this.guessedContainer.includes(id);
    }
}
