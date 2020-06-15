import {AbstractElement} from "./abstractelement";
import { min } from "lodash";

export class Pane extends AbstractElement {    
    minWidth: number = 50;
    private initLeft: number;
    private initWidth: number;
    private initRight: number;
    leftPane: Pane;
    rightPane: Pane;
    isMoving: boolean;

    constructor() {
        super();
        this.setZIndex(0);
        this.element.style.height = '100%';
        this.element.style.left = '0';
        this.element.setAttribute('class', 'splitter-pane');
    }

    adaptRight(): void {
        if(this.rightPane == undefined) return;
        let offset = this.leftPane.getRight();
        this.setLeft(offset);
        let width = this.rightPane.getLeft() - this.getLeft();
        if(width <= this.minWidth) {
            //this.setLeft(offset);
            this.setWidth(this.minWidth);
            this.rightPane.adaptRight();
        } else {
            this.setWidth(width);  
            //this.setLeft(offset);
        } 
    }

    adaptLeft(): void {
        if(this.leftPane == undefined) return;
        let offset = this.leftPane.getRight();
        let width = this.rightPane.getLeft() - this.getLeft();
        if(width <= this.minWidth) {
            this.setLeft(this.rightPane.getLeft() - this.minWidth);
            this.setWidth(this.minWidth);
            this.leftPane.adaptLeft();
        } else {
            this.setWidth(width);
            this.setLeft(offset);
        } 
    }

    private adapt(isLeft: boolean): void {
        let mate: Pane = isLeft ? this.leftPane : this.rightPane;
        if(mate == undefined) return;
        let offset = this.leftPane.getRight();
        let width = this.rightPane.getLeft() - this.getLeft();
        if(width <= this.minWidth) {
            this.setLeft(this.rightPane.getLeft() - this.minWidth);
            this.setWidth(this.minWidth);
            mate.adapt(isLeft);
        } else {
            this.setWidth(width);
            this.setLeft(offset);
        } 
    }

    private getMaxWidth() {
        //return this.rightPane.rightPane.getLeft() - this.rightPane.minWidth - this.getLeft();
        let topRightPane: Pane = this.rightPane;
        let sumMinWidths: number = 0;
        while(topRightPane.rightPane != undefined) {
            let assignedValue: number;
            assignedValue = topRightPane.isMoving ? topRightPane.rightPane.getWidth() : topRightPane.minWidth;
            sumMinWidths += assignedValue;
            topRightPane = topRightPane.rightPane;
        }
        return topRightPane.getLeft() - this.getLeft() - sumMinWidths;
    }

    private getMinLeft() {
        let topLeftPane: Pane = this.leftPane;
        let sumMinLeft: number = 0;
        while(topLeftPane.leftPane != undefined) {
            let assignedValue: number;
            assignedValue = topLeftPane.isMoving ? topLeftPane.getWidth() : topLeftPane.minWidth;
            sumMinLeft += assignedValue;
            topLeftPane = topLeftPane.leftPane;
        }
        return sumMinLeft;
    }


    move(difX: number) {
        let offset = this.initRight + difX;
        let width = offset - this.getLeft();
        let left = this.initLeft + (this.initWidth - this.minWidth + difX);
        this.element.innerHTML = this.getMinLeft() + "";
        if(width <= this.minWidth) {
            this.setWidth(this.minWidth);
            if(left >= this.getMinLeft()) {
                this.setLeft(left);
                this.leftPane.adaptLeft();
            } else {
                this.setLeft(this.getMinLeft());
                this.leftPane.adaptLeft();
            }
        } else if(width >= this.getMaxWidth()) {
            this.setWidth(this.getMaxWidth());
        } else {
            this.setWidth(width);
        } 
        this.rightPane.adaptRight();
        
    }

    moveTest(position: number): void {
        let width: number = position - this.getLeft();
        this.element.innerHTML = this.getMaxWidth() + "";
        if(width <= this.minWidth) {
            this.setWidth(this.minWidth);
            let left: number = position - this.minWidth;
            if(left <= this.getMinLeft()) this.setLeft(this.getMinLeft());
            else this.setLeft(left);
            this.leftPane.adaptLeft();
        } else {
            if(width >= this.getMaxWidth()) this.setWidth(this.getMaxWidth());
            else this.setWidth(position - this.getLeft());
        }
        this.rightPane.adaptRight();        
    }

    initPosition(): void {
        this.initLeft = this.getLeft();
        this.initWidth = this.getWidth();
        this.initRight = this.rightPane.getLeft();
    }

    getInitLeft(): number {
        return this.initLeft;
    }

    getInitWidth(): number {
        return this.initWidth;
    }

    getInitRight(): number {
        return this.initRight;
    }
}