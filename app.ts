/**
 * Subor na otestovanie funkcnosti Splitter-u
 */
import Splitter from "./src/splitter";
import * as Hammer from "hammerjs";
import AttachedItem from "./src/attacheditem";

let root: HTMLElement = document.querySelector("#app");

let splitterConfig = {
    numOfPanes: 4,
    root: root,
    delayInit: true,
    maxNumOfPanes: 10,
}

class SplitLine extends AttachedItem {
    constructor() {
        super();
        this.offset = -1;
        this.element.style.width = "2px";
        this.element.style.height = "100%";
        this.element.style.backgroundColor = "black";
    }
}

class App {

    splitter: Splitter;

    constructor() {
        this.splitter = new Splitter(splitterConfig);
        this.styleMovers(this.splitter);
        this.addSplitLines(this.splitter);
        this.splitter.init();
    }

    private addSplitLines(splitter: Splitter) {
        for(let i = 1; i < splitter.panes.length; i++) {
            let line: SplitLine = new SplitLine();
            root.appendChild(line.element);
            this.splitter.panes[i].attachItem(line);

        }
    }

    private styleMovers(splitter: Splitter): void {
        for(let mover of splitter.movers) {
            mover.element.addEventListener('pointerdown', () => this.smallMover(mover.element));
            document.addEventListener('pointerup', () => this.largeMover(mover.element));
            const hammertime = new Hammer(mover.element);
            hammertime.on("doubletap", () => mover.pane.swap());
        }
    }

    private smallMover(elem: HTMLElement): void {
        const scaleFactor = .2;
        const scale = 1 - scaleFactor;
        elem.style.transform = 'scale(' + scale + ',' + scale +')';
    }

    private largeMover(elem: HTMLElement): void {
        elem.style.transform = 'scale(1, 1)';
    }
}

let app: App = new App();

declare global {
    interface Window {
      tadd: Function;
      tremove: Function;
      tinit: Function;
      tswap: Function;
    }
  }

window.tadd = function tadd(): void {
    app.splitter.addPane();
}
window.tremove = function tremove(): void {
    app.splitter.removePane(app.splitter.panes.length - 1);
}
window.tinit = function tinit(): void {
    app.splitter.init();
}
window.tswap = function tswap(): void {
    app.splitter.panes[0].swapPanes(app.splitter.panes[3]);
}