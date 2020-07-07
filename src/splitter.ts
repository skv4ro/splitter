import Mover from "./mover";
import * as _ from "lodash";
import Pane from "./pane";
import {defConfig} from "./config";

export class Splitter {
    readonly panes: Pane[] = [];
    readonly movers: Mover[] = [];
    private readonly parent: HTMLElement;
    private readonly config;

    constructor(parent: HTMLElement, config: any) {
        this.parent = parent;
        this.config = _.merge(defConfig, config);
        this.build();
    }

    private build(): void {
        let numOfPanes = this.config.numOfPanes;

        let i: number;
        for(i = 0; i < numOfPanes; i++) {
            const pane: Pane = new Pane();
            pane.element.id = 'splitter-pane-' + (i + 1).toString();
            this.panes.push(pane);
            this.parent.appendChild(pane.element);
        }

        for(i = 0; i < numOfPanes; i++) {
            let pane: Pane = this.panes[i]; 
            pane.leftPane = this.panes[i - 1];
            pane.rightPane = this.panes[i + 1];
        }

        this.panes[1].leftItems.push(this.panes[0]);
        this.panes[2].leftItems.push(this.panes[1]);
        this.panes[3].leftItems.push(this.panes[2]);

        /*this.panes[0].minLeft = 0;
        this.panes[1].minLeft = this.panes[0].minWidth;
        this.panes[2].minLeft = this.panes[0].minWidth + this.panes[1].minWidth;
        this.panes[3].minLeft = this.panes[0].minWidth + this.panes[1].minWidth + this.panes[2].minWidth;
        this.panes[0].maxLeft = this.parent.clientWidth - this.panes[3].minWidth - this.panes[2].minWidth - this.panes[1].minWidth - this.panes[0].minWidth;
        this.panes[1].maxLeft = this.parent.clientWidth - this.panes[3].minWidth - this.panes[2].minWidth - this.panes[1].minWidth;
        this.panes[2].maxLeft = this.parent.clientWidth - this.panes[3].minWidth - this.panes[2].minWidth;
        this.panes[3].maxLeft = this.parent.clientWidth - this.panes[3].minWidth;*/


        this.panes[0].leftAnchor = function(): number {
            return 0;
        }
        this.panes[this.panes.length - 1].rightAnchor = function(): number {
            return this.parent.clientWidth;
        }.bind(this);

        for(i = 0; i < numOfPanes - 1; i++) {
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
            pane.element.style.height = this.config.paneHeight;

            /*if(i == 0) {
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
            }*/

            if(i === len - 1) {
                pane.setWidth(this.parent.offsetWidth - this.panes[i - 1].getLeft() - this.panes[i - 1].getWidth());
                pane.setLeft(xOffset);
            } else if(i === 0) {
                pane.setWidth(xValue);
                pane.setLeft(0);
            } else {
                pane.setWidth(xValue);
                pane.setLeft(xOffset);                
            }
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
