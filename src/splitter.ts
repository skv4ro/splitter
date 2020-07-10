import Mover from "./mover";
import * as _ from "lodash";
import Pane from "./pane";
import {defConfig} from "./config";
import * as Hammer from "hammerjs";

export class Splitter {
    readonly panes: Pane[] = [];
    readonly movers: Mover[] = [];
    private readonly root: HTMLElement;
    private readonly config: any;

    constructor(parent: HTMLElement, config: any) {
        this.root = parent;
        this.config = _.merge(defConfig, config);
        this.build(this.config.numOfPanes);
    }

    /**
     * Creates Pane objects, append them to this.panes[] and append pane's element to DOM.
     * @param numOfPanes number of panes to create
     */
    private createPanes(numOfPanes: number): void {
        for(let i: number = 0; i < numOfPanes; i++) {
            let pane: Pane = new Pane();
            this.panes.push(pane);
            this.root.appendChild(pane.element);
        }
    }

    /**
     * Creates Mover objects, append them to this.movers[] and append mover's element to DOM.
     */
    private createMovers(): void {
        for(let i: number = 1; i < this.panes.length; i++) {
            let pane: Pane = this.panes[i];
            let mover: Mover = new Mover(pane);
            pane.attachItem(mover);
            this.movers.push(mover);
            this.root.appendChild(mover.element);

            mover.offset = -25;
            mover.element.addEventListener('pointerdown', () => this.smallMover(mover));
            document.addEventListener('pointerup', () => this.largeMover(mover));
            mover.element.id = 'splitter-mover-' + i.toString() + '-' + (i + 1).toString();
            const hammertime = new Hammer(mover.element);
            hammertime.on("doubletap", () => mover.pane.swap());
            mover.element.setAttribute('class', 'splitter-mover');
        }
    }

    /**
     * Assign left and right mate Pane to each pane of a splitter.
     */
    private assignPanesMates(): void {
        for(let i: number = 0; i < this.panes.length; i++) {
            let pane: Pane = this.panes[i]; 
            pane.leftPane = this.panes[i - 1];
            pane.rightPane = this.panes[i + 1];
        }
    }

    /**
     * Computes min and max left for each pane of a splitter.
     */
    private computeLimits(): void {
        for(let i: number = 0; i < this.panes.length; i++) {
            let pane: Pane = this.panes[i]; 
            pane.updateLimits();
        }
    }

    /**
     * Assignes anchor for top left and top right pane.
     */
    private assignTopPanesAnchor(): void {
        this.panes[0].leftAnchor = function(): number {return 0}
        this.panes[this.panes.length - 1].rightAnchor = function(): number {return this.root.clientWidth}.bind(this);
    }

    /**
     * Builds splitter.
     * @param numOfPanes number of panes of a splitter.
     */
    private build(numOfPanes: number): void {
        this.createPanes(numOfPanes);
        this.assignPanesMates();
        this.assignTopPanesAnchor();
        this.computeLimits();
        this.createMovers();
        this.initStyle();
    }

    /**
     * Initial style of DOM elements of a splitter.
     */
    private initStyle(): void {
        const xValue: number = this.root.offsetWidth / this.panes.length;
        const yValue: number = this.root.offsetHeight / 2;
        let xOffset: number = 0;

        for(let i: number = 0; i < this.panes.length; i++) {
            let pane = this.panes[i];
            pane.element.style.height = this.config.paneHeight;
            if(i === this.panes.length - 1) {
                pane.setWidth(this.root.offsetWidth - this.panes[i - 1].getLeft() - this.panes[i - 1].getWidth());
                pane.setLeft(xOffset);
            } else {
                pane.setWidth(xValue);
                pane.setLeft(xOffset);                
            }
            xOffset += xValue;
        }

        for(let mover of this.movers) {
            mover.setLeft(mover.pane.getLeft() - mover.getWidth() / 2);
            mover.setTop(yValue - mover.getHeight() / 2);
        }
    }

    private updateStyle(): void {
        let fullPanesWidth: number = 0;
        const panesWidths: number[] = [];
        const panesLefts: number[] = [];
        for(let pane of this.panes) {
            panesWidths.push(pane.getWidth());
            panesLefts.push(pane.getLeft());
            fullPanesWidth += pane.getWidth();
        }
        const panesRation: number[] = [];
        for(let i = 0; i < this.panes.length; i++) {
            const pane = this.panes[i];
            panesRation.push(panesWidths[i] / this.root.offsetWidth);
            pane.setLeft(panesLefts[i] * panesRation[i]);
            pane.setWidth(panesWidths[i] * panesRation[i]);
        }

    }
    
    private smallMover(mover: Mover): void {
        const scaleFactor = .2;
        const scale = 1 - scaleFactor;
        mover.element.style.transform = 'scale(' + scale + ',' + scale +')';
    }

    private largeMover(mover: Mover): void {
        mover.element.style.transform = 'scale(1, 1)';
    }
}
