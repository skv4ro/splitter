import Pane from "./pane";
import DummyPane from "./dummypane";
import Mover from "./mover";
import DefaultConfig from "./defaultconfig";
import * as _ from "lodash";

export class Splitter {
    readonly panes: Pane[] = [];
    readonly movers: Mover[] = [];
    private readonly parent: HTMLElement;

    constructor(parent: HTMLElement, numOfPanes: number) {
        this.parent = parent;
        this.build(numOfPanes);
        //addEventListener('resize', this.updateStyle.bind(this));
        //document.addEventListener("pointerdown", () => this.initPanePositions());
    }

    private initPanePositions(): void {
        for(let i = 1; i < this.panes.length - 1; i++) {
            let pane: Pane = this.panes[i];
            pane.initPosition();
        }
    }

    private build(numOfPanes: number): void {
        let leftDummyPane = new Pane();
        leftDummyPane.element.id = "dummy-pane-0";
        this.panes.push(leftDummyPane);
        this.parent.appendChild(leftDummyPane.element);

        let i: number;
        for(i = 0; i < numOfPanes; i++) {
            const pane: Pane = new Pane();
            pane.element.id = 'splitter-pane-' + (i + 1).toString();
            this.panes.push(pane);
            this.parent.appendChild(pane.element);
        }

        let rightDummyPane = new Pane();
        rightDummyPane.element.id = "dummy-pane-" + (numOfPanes + 1);
        this.panes.push(rightDummyPane);
        this.parent.appendChild(rightDummyPane.element);

        for(i = 1; i < numOfPanes + 1; i++) {
            let pane: Pane = this.panes[i]; 
            pane.leftPane = this.panes[i - 1];
            pane.rightPane = this.panes[i + 1];
        }

        this.panes[0].rightPane = this.panes[1];
        this.panes[this.panes.length - 1].leftPane = this.panes[this.panes.length - 2];

        for(i = 1; i < numOfPanes; i++) {
            const mover: Mover = new Mover(this.panes[i], this.panes[i + 1]);
            mover.element.id = 'splitter-mover-' + i.toString() + '-' + (i + 1).toString();
            this.movers.push(mover);
            this.parent.appendChild(mover.element);
            mover.setParent(this.parent);
        }

        this.initStyle();
    }

    private initStyle(): void {
        const xValue: number = this.parent.offsetWidth / this.panes.length;
        const yValue: number = this.parent.offsetHeight / 2;
        let xOffset: number = 0;

        let i: number = 0;
        const len = this.panes.length;
        for(i; i < len; i++) {
            let pane = this.panes[i];
            let leftPane = this.panes[i - 1];

            if(i == 0) {
                pane.setLeft(0);
                pane.setWidth(0);
            } else if(i == len - 1) {
                pane.setWidth(0);
                pane.setLeft(this.parent.clientWidth - pane.getWidth());
            } else if (i == len - 2) {
                pane.setLeft(leftPane.getLeft() + leftPane.getWidth());
                pane.setWidth(this.parent.offsetWidth - leftPane.getLeft() - leftPane.getWidth() - this.panes[len - 1].getWidth() - (this.panes[len - 1].element.offsetWidth - this.panes[len - 1].element.clientWidth));
            } else {
                pane.setLeft(leftPane.getLeft() + leftPane.getWidth());
                pane.setWidth(xValue);
            }

            /*if(i === len - 1) {
                pane.setWidth(this.parent.offsetWidth - this.panes[i - 1].getLeft() - this.panes[i - 1].getWidth());
            } else if(i === 0) {

            } else {
                pane.setWidth(xValue);
            }*/
            xOffset += xValue;
        }

        for(let mover of this.movers) {
            mover.setLeft(mover.rightMate.getLeft() - mover.getWidth() / 2);
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
        //const xResizeRation: number = this.parent.offsetWidth / fullPanesWidth;
        for(let i = 0; i < this.panes.length; i++) {
            const pane = this.panes[i];
            panesRation.push(panesWidths[i] / this.parent.offsetWidth);
            pane.setLeft(panesLefts[i] * panesRation[i]);
            pane.setWidth(panesWidths[i] * panesRation[i]);
        }

    }
}
