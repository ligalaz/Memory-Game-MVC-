import { Kit, Timer } from "../../interfaces/enums";
import { GameSettings, ICard, IProps } from "../../interfaces/interface";
import { GameView } from "../game/gameView";
import characters from "../../resources/gamebase/characters";

export class StartModel {
    public gameView: GameView;
    public cardKit: Array<ICard>;
    constructor() {
        this.cardKit = characters;
    }

    public gameInitialize(gameSettings: GameSettings): void {
        this.activateGameView(gameSettings.element as HTMLBodyElement).initialize(this.formedProps(gameSettings));
    }

    public activateGameView(element: HTMLBodyElement): GameView {
        return (this.gameView = new GameView(element));
    }

    public formedGameField(cardNumber: number): Array<ICard> {
        return [...this.cardKit.slice(0, cardNumber), ...this.cardKit.slice(0, cardNumber)].sort(() => Math.random() - 0.5);
    }

    public changeTimerStartTime(value: number): string {
        switch (value) {
            case Kit.Minimum:
                return Timer.Minimum;
                break;
            case Kit.Middle:
                return Timer.Middle;
                break;
            case Kit.Maximum:
                return Timer.Maximum;
                break;
            default:
                return Timer.Minimum;
                break;
        }
    }

    public formedProps(gameSettings: GameSettings): IProps {
        return {
            playerName: gameSettings.playerName,
            gameField: this.formedGameField(gameSettings.gameCards),
            timer: this.changeTimerStartTime(gameSettings.gameCards),
        };
    }
}
