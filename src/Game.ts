import "./game.scss";
import { StartView } from "./modules/start-menu/startView";

const parent: HTMLBodyElement = document.querySelector(".parent") as HTMLBodyElement;

const App = new StartView(parent);
App.initialize();
