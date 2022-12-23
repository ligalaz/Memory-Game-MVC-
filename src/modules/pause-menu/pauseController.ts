import { IResult } from "../../interfaces/interface";
import { PauseModel } from "./pauseModel";

export class PauseController {
    public pauseModel: PauseModel;

    public restart(element: HTMLBodyElement): void {
        this.pauseModel.restartGame(element);
    }

    public initialize(props: string): void {
        this.pauseModel = new PauseModel(props);
    }

    public getLeaderboard(): Array<IResult> {
        return this.pauseModel.parseLeaderboard();
    }
}
