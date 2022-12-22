import { IProps, View } from "../../interfaces/interface";
import { PauseController } from "./pauseController";

export class PauseView extends View {
    public pauseController: PauseController;
    public leaderboardMenu: HTMLDivElement;
    public startButton: HTMLButtonElement;
    public restartButton: HTMLButtonElement;
    public leaderboardButton: HTMLButtonElement;

    public leaderBoardList = `.leaderboard-list`;
    public leaderboardHidden = `leaderboard_hidden`;

    constructor(public element: HTMLElement, public gameElement: HTMLBodyElement) {
        super(element);
        this.element = element;
        this.pauseController = new PauseController();
        this.gameElement = gameElement;
    }

    public render(): void {
        this.element.innerHTML = `<div class="pause-menu game-menu__item">
        <div class="title pause-menu__title">PAUSED</div>
        <div class="control pause-menu__control">
          <button class="control-btn control-btn_second">RESTART GAME</button>
          <button class="control-btn control-btn_third">LEADERBOARD</button>
        </div>
        <button class="menu-btn pause-menu__btn">START NEW GAME</button>
      </div>
      <div class="leaderboard pause-menu__leaderboard leaderboard_hidden">
            <div class="title">TOP 10 BEST RESULTs</div>
            <div class="leaderboard__title">
                <p class="leaderboard__num">№</p>
                <p class="leaderboard__playername">NAME</p>
                <p class="leaderboard__time">TIME</p>
            </div>
            <div class="leaderboard-list">
                </div>
            </div>
        </div> `;
    }

    public hosts(): void {
        this.leaderboardMenu = this.element.querySelector(`.leaderboard`) as HTMLDivElement;
        this.startButton = this.element.querySelector(`.menu-btn`) as HTMLButtonElement;
        this.restartButton = this.element.querySelectorAll(`.control-btn`)[0] as HTMLButtonElement;
        this.leaderboardButton = this.element.querySelectorAll(`.control-btn`)[1] as HTMLButtonElement;
    }

    public listeners(): void {
        this.startButton.addEventListener(`click`, () => {
            this.newGameView();
        });

        this.restartButton.addEventListener(`click`, () => {
            this.restartView();
        });

        this.leaderboardMenu.addEventListener("click", (e: Event) => {
            (e.target as HTMLElement).classList.add(this.leaderboardHidden);
        });

        if (localStorage.getItem("winners")) {
            this.leaderboardButton.addEventListener("click", () => {
                this.createLeaderBoardView();
                this.leaderboardView();
            });
        } else {
            this.leaderboardButton.addEventListener("click", () => {
                alert(`Sorry, leaderboard is empty. Win in game!`);
            });
        }
    }

    public initialize(): void {
        this.render();
        this.hosts();
        this.listeners();
        this.pauseController.initialize(this.element.id as string);
    }

    public newGameView(): void {
        window.location.reload();
    }

    public restartView(): void {
        this.pauseController.restart(this.gameElement);
    }

    public leaderboardView(): void {
        this.leaderboardMenu.classList.remove(this.leaderboardHidden);

        window.setTimeout(() => {
            this.leaderboardMenu.classList.add(this.leaderboardHidden);
        }, 10000);
    }

    public createLeaderBoardView() {
        const leaderBoard = this.pauseController.getLeaderboard();
        const leaderBoardList = this.leaderboardMenu.querySelector(this.leaderBoardList) as HTMLDivElement;

        leaderBoardList.innerHTML = leaderBoard
            .map(
                (item, idx) => `<div class="leaderboard-list__item">
                                        <p leaderboard-list__num>${idx + 1}</p>
                                        <p class="leaderboard-list__playername">${item.playerName}</p>
                                        <p class="leaderboard-list__time">${item.time}</p>
                                    </div>`
            )
            .join("");
    }
}
