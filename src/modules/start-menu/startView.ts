import { View } from "../../interfaces/interface";
import { StartController } from "./startController";

export class StartView extends View {
    public startController: StartController;
    public startMenu: HTMLDivElement;
    public menuHidden = `start-menu_hidden`;
    public playerName: HTMLInputElement;
    public gameCards: NodeListOf<HTMLInputElement>;
    public gameCardsButtons: NodeListOf<HTMLLabelElement>;
    public labelChecked = `label_checked`;
    public startButton: HTMLButtonElement;
    public validateMessage: HTMLDivElement;
    public messageButton: HTMLButtonElement;
    public messageHidden = `main-message_hidden`;

    constructor(public element: HTMLElement) {
        super(element);
        this.startController = new StartController();
    }

    public render(): void {
        this.element.innerHTML = `<main class="main parent_started_false">
        <div class="main-message main-message_hidden">
                <p class="main-message__text">Please <span class="main-message__attention"> enter player name </span> and click Start Game</p>
                <button class="button main-message__button">OK</button>
        </div>    
        <div class="game-menu parent__game-menu">
             <div class="start-menu game-menu__item">
                <div class="title start-menu__title">POKEMON MEMORY GAME</div>
                    <form action="#" class="form start-menu__form">
                        <input
                            type="text"
                            class="name form__name"
                            placeholder="Enter your name"
                        />
                        <div class="radio-btn form__radio-btn">
                            <p class="radio-btn__text">Select number of card:</p>
                            <div class="radio-btn__selects">
                                <div class="radio-btn-input radio-btn__item">
                                    <input
                                         type="radio"
                                        id="radio-1"
                                        name="radio"
                                        value="8"
                                        class="radio-btn__item-input"
                                        checked
                                    />
                                    <label class="radio-btn-label label_checked" for="radio-1">16 CARD</label>
                                </div>
                                <div class="radio-btn-input radio-btn__item">
                                    <input
                                        type="radio"
                                        id="radio-2"
                                        name="radio"
                                        value="12"
                                        class="radio-btn__item-input"
                                    />
                                    <label class="radio-btn-label" for="radio-2">24 CARD</label>
                                </div>
                                <div class="radio-btn-input radio-btn__item">
                                    <input
                                        type="radio"
                                        id="radio-3"
                                        name="radio"
                                        value="16"
                                        class="radio-btn__item-input"
                                    />
                                    <label class="radio-btn-label" for="radio-3">32 CARD</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="menu-btn start-menu__btn">
                            START GAME
                        </button>
                    </form>
            </div>
      </div>
</main>`;
    }

    public hosts(): void {
        this.startMenu = this.element.querySelector(".start-menu") as HTMLDivElement;
        this.playerName = this.element.querySelector(".form__name") as HTMLInputElement;
        this.gameCards = this.element.querySelectorAll(".radio-btn__item-input") as NodeListOf<HTMLInputElement>;
        this.gameCardsButtons = this.element.querySelectorAll(".radio-btn-label") as NodeListOf<HTMLLabelElement>;
        this.startButton = this.element.querySelector(".start-menu__btn") as HTMLButtonElement;
        this.validateMessage = this.element.querySelector(".main-message") as HTMLDivElement;
        this.messageButton = this.validateMessage.querySelector(".main-message__button") as HTMLButtonElement;
    }

    public listeners(): void {
        this.startButton.addEventListener("click", (e: Event) => {
            e.preventDefault();
            if (this.validate()) {
                this.startController.startGame({
                    playerName: this.playerName.value,
                    gameCards: this.getGameCardValue(),
                    element: this.element,
                });
            } else {
                this.helpMenuToogle(false);
            }
        });
        this.messageButton.addEventListener("click", () => {
            this.helpMenuToogle(true);
        });
        this.gameCardsButtons.forEach((item) => {
            item.addEventListener("click", () => {
                this.gameCardsUncheked();
                item.classList.add(this.labelChecked);
            });
        });
    }

    public initialize(): void {
        this.render();
        this.hosts();
        this.listeners();
    }

    public validate(): boolean {
        return this.playerName.value ? true : false;
    }

    public helpMenuToogle(flag: boolean): void {
        if (flag) {
            this.hostDisabled(false);
            this.validateMessage.classList.add(this.messageHidden);
        } else {
            this.hostDisabled(true);
            this.validateMessage.classList.remove(this.messageHidden);
        }
    }

    public hostDisabled(flag: boolean) {
        if (flag) {
            this.startMenu.classList.add(this.menuHidden);
            this.playerName.disabled = true;
            this.startButton.disabled = true;
        } else {
            this.startMenu.classList.remove(this.menuHidden);
            this.playerName.disabled = false;
            this.startButton.disabled = false;
        }
    }
    public getGameCardValue(): number {
        let value = ``;
        this.gameCards.forEach((item) => {
            if (item.checked) {
                value = item.value;
            }
        });
        return Number(value);
    }

    public gameCardsUncheked(): void {
        this.gameCardsButtons.forEach((item) => {
            item.classList.remove(this.labelChecked);
        });
    }
}
