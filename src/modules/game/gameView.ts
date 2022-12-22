import { ICard, IProps, View } from "../../interfaces/interface";
import { GameController } from "./gameController";

export class GameView extends View {
    public gameController: GameController;
    public manyChangesValidator: Array<string>;
    public playerName: string;
    public gameCards: NodeListOf<HTMLDivElement>;
    public messageMenu: HTMLDivElement;
    public messageButton: HTMLButtonElement;
    public winMessageMenu: HTMLDivElement;
    public newGameButton: HTMLButtonElement;
    public restartGameButton: HTMLButtonElement;
    public pauseButton: HTMLButtonElement;
    public pauseMenu: HTMLDivElement;
    public timerCount: HTMLDivElement;
    public timerId: number;
    public pauseGuard = false;
    public isGameStarted = false;
    public isGamePaused = false;
    public messageHidden = `main-message_hidden`;
    public frontCards = `.game-card__front`;
    public backCards = `.game-card__back`;
    public backFrontTransform = `back-front`;
    public frontBackTransform = `front-back`;
    public pauseButtonActive = `pause-btn_active`;
    public pauseMenuHidden = `pause-menu_hidden`;

    constructor(public element: HTMLBodyElement) {
        super(element);
        this.gameController = new GameController();
        this.manyChangesValidator = [`0`];
    }

    public render(props?: IProps): void {
        const { playerName, gameField, timer } = props as IProps;

        this.element.innerHTML = ` <header class="header parent__header">
                                        <div class="pause-btn parent__pause-btn">
                                             <svg class="pause-btn__logo">
                                                <use class="pause-btn__item" xlink:href="./resources/icons/buttons/pause.svg#pause"></use>
                                             </svg>
                                        </div>
                                        <div class="timer parent__timer">
                                             <p class="timer__item">Remaining</p>
                                            <p class="count timer__item">${timer}</p>
                                            <p class="timer__item">seconds</p>
                                        </div>
                                    </header>
                                    <main class="main parent_started_false">
                                     <div class="main-message ">
                                        <p class="main-message__text"><span class="main-message__attention">"${playerName}"</span>, remember the position of the cards</p>
                                        <button class="button main-message__button">OK</button>
                                    </div> 
                                    <div class="main-message main-message_hidden">
                                        <p class="main-message__text"></p>
                                        <button class="button main-message__button">New Game</button>
                                        <button class="button main-message__button">Restart</button>
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
                                </main>
                                <div id='${JSON.stringify(props)}' class="pause-menu__template pause-menu_hidden"></div>
                                <footer class="footer parent__footer">
                                    <div class="link footer__link">
                                        <a class="link__item" href="https://ligalaz.github.io/rsschool-cv/" target="_blank">
                                            <svg  class="link__logo">
                                                <use xlink:href="./resources/icons/links/github.svg#github"></use>
                                            </svg>
                                         </a>
                                    </div>
                                    <div class="created footer__created">
                                        <p class="created__text">Created by Artsiom Mikula</p>
                                        <p class="created__year">Minsk 2022</p>
                                    </div>
                                </footer>`;
        this.element.classList.add(`parent_started_true`);
    }
    public hosts(): void {
        this.playerName = (this.element.querySelector(`.game-field`) as HTMLDivElement).id;
        this.gameCards = this.element.querySelectorAll(`.game-card`);
        this.messageMenu = this.element.querySelectorAll(`.main-message`)[0] as HTMLDivElement;
        this.messageButton = this.messageMenu.querySelector(".main-message__button") as HTMLButtonElement;
        this.winMessageMenu = this.element.querySelectorAll(`.main-message`)[1] as HTMLDivElement;
        this.pauseButton = this.element.querySelector(`.pause-btn__item`) as HTMLButtonElement;
        this.pauseMenu = this.element.querySelector(`.pause-menu__template`) as HTMLDivElement;
        this.timerCount = this.element.querySelector(`.count`) as HTMLDivElement;
    }

    public listeners(): void {
        this.messageButton.addEventListener("click", () => {
            this.startGameView();
        });

        this.gameCards.forEach((item) => {
            item.addEventListener("click", (e: Event) => {
                this.isGameStarted ? this.gameMove(e, item) : null;
            });
            item.addEventListener("dblclick", () => {
                return null;
            });
        });

        this.pauseButton.addEventListener("click", (e: Event) => {
            if (!this.pauseGuard) {
                this.gameController.getTimer() !== "undefined" ? this.pauseView() : null;
            } else {
                alert(`Not so fast, ${this.playerName}`);
            }
            setTimeout(() => {
                this.pauseGuard = false;
            }, 300);
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
            });
            this.isGameStarted = true;
            this.gameController.setModelSettings(this.gameCards.length / 2, this.timerCount.textContent as string);
            this.gameController.setTimer(false);
            this.timerView();
            this.gameController.pauseMenuActive(this.pauseMenu, this.element);
        }, 5000);
    }

    public timerView(): void {
        this.timerId = window.setInterval(() => {
            const timerValue = this.gameController.getTimer();
            this.timerCount.textContent = timerValue;
            if (!Number(timerValue)) {
                this.winnerView();
            }
        }, 1000);
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
        this.winnerView();
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

    public pauseView(): void {
        this.pauseGuard = true;
        if (this.isGamePaused) {
            this.gameController.setTimer(false);
            this.gameController.setModelSettings(this.gameCards.length / 2, this.timerCount.textContent as string);
            this.timerView();
        } else {
            this.gameController.setTimer(true);
            clearInterval(this.timerId);
        }
        this.pauseMenu.classList.toggle(this.pauseMenuHidden);
        this.pauseButton.classList.toggle(this.pauseButtonActive);
        this.isGamePaused = !this.isGamePaused;
        this.isGameStarted = !this.isGameStarted;
    }

    public winnerView(): void {
        const { message, time } = this.gameController.getWin(this.playerName);
        switch (message) {
            case `You win`:
                this.createResultView(time, message, true);
                break;
            case `You loss`:
                this.createResultView(time, message, false);
                break;
            default:
                break;
        }
    }

    public createResultView(time: string, message: string, flag: boolean): void {
        const template = flag
            ? `<p class="main-message__text">Congratulations, <span class="main-message__attention">"${this.playerName}"</span>, <span class="main-message__attention">${message}</span> with time: <span class="main-message__attention">${time}</span>!</p>`
            : `<p class="main-message__text">Sorry, <span class="main-message__attention">"${this.playerName}"</span>, <span class="main-message__attention">${message}</span> (!</p>`;
        this.winMessageMenu.innerHTML = `${template}
                                        <button class="button main-message__button">New Game</button>
                                        <button class="button main-message__button">Restart</button>`;
        this.winMessageMenu.classList.remove(this.messageHidden);
        this.isGameStarted = false;
        clearInterval(this.timerId);
        this.unClickedPause();
        this.messageButtonHost();
    }

    public unClickedPause(): void {
        this.pauseButton.addEventListener("click", () => {
            this.pauseButton.classList.remove(this.pauseButtonActive);
            this.pauseMenu.classList.add(this.pauseMenuHidden);
            this.isGameStarted = false;
            this.isGamePaused = false;
            this.pauseGuard = true;
        });
    }

    public messageButtonHost(): void {
        this.newGameButton = this.winMessageMenu.querySelectorAll(`.main-message__button`)[0] as HTMLButtonElement;
        this.restartGameButton = this.winMessageMenu.querySelectorAll(`.main-message__button`)[1] as HTMLButtonElement;
        this.newGameButton.addEventListener("click", () => {
            this.gameReview(true);
        });
        this.restartGameButton.addEventListener("click", () => {
            this.gameReview(false);
        });
    }

    public gameReview(flag: boolean): void {
        flag ? this.gameController.newGame() : this.gameController.restartGame();
    }
}
