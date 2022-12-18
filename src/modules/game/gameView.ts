import { ICard, IProps, View } from "../../interfaces/interface";
import { GameController } from "./gameController";

export class GameView extends View {
    public gameController: GameController;
    public manyChangesValidator: Array<string>;
    public gameCards: NodeListOf<HTMLDivElement>;
    public messageMenu: HTMLDivElement;
    public messageButton: HTMLButtonElement;
    public isGameStarted = false;

    public messageHidden = `main-message_hidden`;
    public frontCards = `.game-card__front`;
    public backCards = `.game-card__back`;
    public backFrontTransform = `back-front`;
    public frontBackTransform = `front-back`;

    constructor(public element: HTMLBodyElement) {
        super(element);
        this.gameController = new GameController();
        this.manyChangesValidator = [`0`];
    }

    public render(props?: IProps): void {
        const { playerName, gameField, timer } = props as IProps;

        this.element.innerHTML = `<main class="main parent_started_false">
                                     <div class="main-message ">
                                        <p class="main-message__text"><span class="main-message__attention">${playerName}</span>, remember the position of the cards</p>
                                        <button class="button main-message__button">OK</button>
                                    </div> 
                                    <div class="game-field parent__game-field" id="${playerName}">${gameField
            .map(
                (item: ICard, idx: number) => `<div id="${item.id}" class="game-card game-field__card" data-position="${idx + 1}">
                                        <div class="game-card__front">
                                            <div class="card-image game-card__image">
                                                <img
                                                    src="${item.img}"
                                                    alt="pokemon"
                                                    class="card-image__item"
                                                />
                                            </div>
                                            <div class="game-name game-card__name">
                                                <p class="game-name__text">${item.name}</p>
                                            </div>
                                        </div>
                                        <div class="game-card__back"></div>
                                    </div>`
            )
            .join("")}
                                    </div>
                                </main>`;
    }
    public hosts(): void {
        this.gameCards = this.element.querySelectorAll(`.game-card`);
        this.messageMenu = this.element.querySelector(`.main-message`) as HTMLDivElement;
        this.messageButton = this.element.querySelector(".main-message__button") as HTMLButtonElement;
    }

    public listeners(): void {
        this.messageButton.addEventListener("click", () => {
            this.startGameView();
        });

        this.gameCards.forEach((item) => {
            item.addEventListener("click", (e: Event) => {
                this.isGameStarted ? this.gameMove(e, item) : null;
            });
        });
    }

    public initialize(props?: IProps): void {
        this.render(props);
        this.hosts();
        this.listeners();
    }

    public startGameView(): void {
        this.messageMenu.classList.add(this.messageHidden);
        window.setTimeout(() => {
            this.gameCards.forEach((item) => {
                this.hideCard(true, item);
                this.isGameStarted = true;
            });
        }, 5000);
    }

    public gameMove(e: Event, item: HTMLDivElement): void {
        const target = e.currentTarget as HTMLDivElement;
        const position = target.dataset.position as string;
        this.validateGameMove(target.id, position) ? this.viewGameMove(target.id, item) : alert(`This card has been guessed`);
    }

    public viewGameMove(id: string, currentItem: HTMLDivElement): void {
        const value = this.gameController.checkCard(id);
        if (value === id) {
            this.hideCard(false, currentItem);
        } else {
            this.unGuessedView(value, currentItem, id);
        }
    }

    public unGuessedView(value: string, currentItem: HTMLDivElement, id: string): void {
        this.gameCards.forEach((item) => {
            if (item.id === value || item.id === id) {
                window.setTimeout(() => {
                    this.hideCard(true, item);
                }, 1000);
                this.hideCard(false, currentItem);
                this.manyChangesValidator.pop();
            }
        });
    }

    public hideCard(flag: boolean, item: HTMLDivElement): void {
        if (flag) {
            item.querySelector(this.backCards)?.classList.add(this.backFrontTransform);
            item.querySelector(this.frontCards)?.classList.add(this.frontBackTransform);
        } else {
            item.querySelector(this.backCards)?.classList.remove(this.backFrontTransform);
            item.querySelector(this.frontCards)?.classList.remove(this.frontBackTransform);
        }
    }

    public validateGameMove(id: string, position: string): boolean {
        return !this.checkGuessed(id) && this.validateManyChanges(position) ? true : false;
    }

    public checkGuessed(id: string): boolean {
        return this.gameController.checkGuessed(id);
    }

    public validateManyChanges(position: string): boolean {
        this.manyChangesValidator.push(position);
        return this.manyChangesValidator[this.manyChangesValidator.length - 1] === this.manyChangesValidator[this.manyChangesValidator.length - 2]
            ? false
            : true;
    }
}
