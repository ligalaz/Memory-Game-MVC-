import { GameModel } from "./gameModel";

export class GameController {
    public gameModel: GameModel;
    constructor() {
        this.gameModel = new GameModel();
    }

    public currentCompareLength(): number {
        return this.gameModel.compareContainer.length;
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
        }
    }
}
