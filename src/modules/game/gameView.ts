import { ICard, IProps, View } from "../../interfaces/interface";
import { GameController } from "./gameController";

export class GameView extends View {
    public gameController: GameController;
    public gameCards: NodeListOf<HTMLDivElement>;
    public frontCards = `.game-card__front`;
    public backCards = `.game-card__back`;
    public backFrontTransform = `back-front`;
    public frontBackTransform = `front-back`;
    public messageMenu: HTMLDivElement;
    public messageButton: HTMLButtonElement;

    public messageHidden = `main-message_hidden`;
    public isGameStarted = false;

    constructor(public element: HTMLBodyElement) {
        super(element);
        this.gameController = new GameController();
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
                (item: ICard) => `<div id="${item.id}" class="game-card game-field__card">
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
            this.messageMenu.classList.add(this.messageHidden);
            window.setTimeout(() => {
                this.gameCards.forEach((item) => {
                    this.hideCard(true, item);
                    this.isGameStarted = true;
                });
            }, 5000);
        });
        this.gameCards.forEach((item) => {
            item.addEventListener("click", (e: Event) => {
                if (this.isGameStarted) {
                    const value = this.gameController.checkCard((e.currentTarget as HTMLDivElement).id);
                    if (value === (e.currentTarget as HTMLDivElement).id) {
                        this.hideCard(false, item);
                    } else {
                        this.gameCards.forEach((item) => {
                            if (item.id === value || item.id === (e.currentTarget as HTMLDivElement).id) {
                                window.setTimeout(() => {
                                    this.hideCard(true, item);
                                }, 1000);
                                this.hideCard(false, e.currentTarget as HTMLDivElement);
                            }
                        });
                    }
                } else {
                    console.log(null);
                }
            });
        });
    }

    public initialize(props?: IProps): void {
        this.render(props);
        this.hosts();
        this.listeners();
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
}
