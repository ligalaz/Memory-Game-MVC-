import { IProps, IResult, leaderBoard } from "../../interfaces/interface";
import { GameView } from "../game/gameView";

export class PauseModel {
    public gameView: GameView;
    public leaderBoard: leaderBoard;
    public element: HTMLBodyElement;

    constructor(public props: string) {
        this.props = props;
        this.leaderBoard = window.localStorage.getItem(`winners`) as string;
    }

    public transformJSON<T>(value: string): T {
        return JSON.parse(value) as T;
    }

    public restartGame(element: HTMLBodyElement): void {
        this.gameView = new GameView(element);
        this.gameView.initialize(this.transformJSON<IProps>(this.props));
    }

    public parseLeaderboard(): Array<IResult> {
        return this.transformJSON<Array<IResult>>(this.leaderBoard as string);
    }
}
