import Mover from "./mover";
import * as _ from "lodash";
import Pane from "./pane";
import {defConfig} from "./config";

export default class Splitter {
    readonly panes: Pane[] = [];
    readonly movers: Mover[] = [];
    readonly root: HTMLElement;
    readonly config: any;
    private rootWidth: number;

    constructor(config: any) {
        this.root = config.root;
        this.config = _.merge(defConfig, config);
        
        this.setRootWidth();
        if(this.config.numOfPanes > this.config.maxNumOfPanes) this.config.numOfPanes = this.config.maxNumOfPanes;
        this.build(this.config.numOfPanes);
        if(!this.config.delayInit) this.init();
        addEventListener("resize", () => this.update());
    }

    /**
     * Creates Pane objects, append them to this.panes[] and append pane's element to DOM.
     * @param numOfPanes number of panes to create
     */
    private createPanes(numOfPanes: number): void {
        for(let i: number = 0; i < numOfPanes; i++) {
            this.createPane(i);
        }
    }

    private createPane(index: number): Pane {
        let pane: Pane = new Pane();
            if(this.config.addId) {
                pane.element.id = this.config.paneIdName + index;
            }
            if(this.config.addCssClass) {
                pane.element.setAttribute("class", this.config.paneCssClassName);
            } else {
                pane.styleDefault();
            }
            this.panes.push(pane);
            this.root.appendChild(pane.element);
            return pane;
    }

    /**
     * Creates Mover objects, append them to this.movers[] and append mover's element to DOM.
     */
    private createMovers(): void {
        for(let i: number = 1; i < this.panes.length; i++) {
            let pane: Pane = this.panes[i];
            this.createMover(pane,i - 1);
        }
    }

    private createMover(pane: Pane, index: number): Mover {
        let mover: Mover = new Mover(pane);
        if(this.config.addId) {
            mover.element.id = this.config.moverIdName + index;
        }
        if(this.config.addCssClass) {
            mover.element.setAttribute("class", this.config.moverCssClassName);
        } else {
            mover.styleDefault();
        }
        mover.moveY = this.config.moverMoverY;
        pane.attachItem(mover);
        this.movers.push(mover);
        this.root.appendChild(mover.element);
        mover.offset = this.config.moverOffset;
        mover.setTop(mover.pane.getHeight() / 2 - mover.getHeight());
        return mover;
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
        this.panes[0].leftAnchor = this.topLeftAnchor;
        this.panes[this.panes.length - 1].rightAnchor = this.topRightAnchor.bind(this);
    }

    private topLeftAnchor(): number {
        return 0;
    }

    private topRightAnchor(): number {
        return this.root.clientWidth;
    }

    /**
     * Builds splitter.
     * @param numOfPanes number of panes of a splitter.
     */
    private build(numOfPanes: number): void {
        this.createPanes(numOfPanes);
        if(numOfPanes > 1) {
            this.assignPanesMates();
            this.assignTopPanesAnchor();
            this.computeLimits();
            this.createMovers();
        }
    }

    private setRootWidth(): void {
        this.rootWidth = this.root.clientWidth;
    }

    getRootWidth(): number {
        return this.root.clientWidth;
    }

    /**
     * Initialize position of panes.
     */
    init(): void {
        let numOfPanes: number = this.panes.length;
        let widthOfPane: number = this.getRootWidth() / numOfPanes;
        let position: number = this.getRootWidth() - widthOfPane;
        for(let i: number = this.panes.length - 1; i > 0; i--) {
            let pane: Pane = this.panes[i];
            pane.move(position);
            position -= widthOfPane;
        }
    }

    addPane(): void {
        if(this.panes.length + 1 > this.config.maxNumOfPanes) return;
        let oldLastPane: Pane = this.panes[this.panes.length - 1];
        let pane: Pane = this.createPane(this.panes.length);
        oldLastPane.rightPane = pane;
        pane.leftPane = oldLastPane;
        pane.rightAnchor = this.topRightAnchor.bind(this);
        this.createMover(pane, this.movers.length);
        pane.setLeft(this.getRootWidth());
        this.updateLimitsOfAllPanes();
        pane.move(pane.rightAnchor() - pane.minWidth);  
    }

    removePane(i: number): void {
        let moverIndex = i - 1;
        let pane: Pane = this.panes[i];
        let mover: Mover = this.movers[moverIndex];
        let paneToAdapt: Pane;
        if(pane == undefined) return;
        if(pane.rightPane == undefined) {
            paneToAdapt = pane.leftPane;
            let newTopRightPane: Pane = this.panes[i - 1];
            newTopRightPane.rightAnchor = this.topRightAnchor.bind(this);
            newTopRightPane.rightPane = undefined;
        } else if(pane.leftPane == undefined) {
            paneToAdapt = pane.rightPane;
            let newTopLeftPane: Pane = this.panes[i + 1];
            newTopLeftPane.leftAnchor = this.topLeftAnchor;
            newTopLeftPane.leftPane = undefined;
            moverIndex = i;
            mover = this.movers[moverIndex];
        } else {
            let leftPane: Pane = this.panes[i - 1];
            let rightPane: Pane = this.panes[i + 1];
            leftPane.rightPane = rightPane;
            rightPane.leftPane = leftPane;
            paneToAdapt = leftPane;
        }
        mover.element.remove();
        this.movers.splice(moverIndex, 1);
        pane.removeAttachedItemsFromDom();
        pane.element.remove();
        this.panes.splice(i, 1);
        this.updateLimitsOfAllPanes();
        paneToAdapt.setLeft(paneToAdapt.leftAnchor());
        paneToAdapt.adapt();
    }

    private updateLimitsOfAllPanes(): void {
        for(let pane of this.panes) {
            pane.updateLimits();
        }
    }

    update(): void {
        if(this.panes.length == 1) this.panes[0].setWidth(this.getRootWidth());
        let oldRootwidth: number = this.getRootWidth();
        this.setRootWidth();
        let newRootWidth: number = this.getRootWidth();

        let ratio: number = newRootWidth / oldRootwidth

        for(let i = 1; i < this.panes.length; i++) {
            let pane: Pane = this.panes[i];
            pane.updateLimits();                
            pane.move(pane.getLeft() * ratio);
        }
    }
}
