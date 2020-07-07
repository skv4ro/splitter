import PseudoElement from "./pseudoelement";
import Pane from "./pane";
import * as Hammer from "hammerjs";
import { takeRightWhile } from "lodash";

export default class Mover extends PseudoElement {
    readonly leftMate: Pane;
    readonly rightMate: Pane;
    private initX: number = 0;
    private initY: number = 0;
    private initTop: number = 0;
    private scaleFactor: number = .2;
    private boundMouseMoveHandle: EventListener;
    private pointerID: number;
    parent: HTMLElement;
    topLeftMate: Pane = this.leftMate;
    topRightMate: Pane = this.rightMate;


    constructor(leftMate: Pane, rightMate: Pane) {
        super();
        this.leftMate = leftMate;
        this.rightMate = rightMate;
        this.element.setAttribute('class', 'splitter-mover');

        this.element.addEventListener('pointerdown', event => this.eventStartHandler(event));
        document.addEventListener('pointerup', event => this.eventEndHandler(event));

        const hammertime = new Hammer(this.element);
        hammertime.on("doubletap", () => this.swapPanes());

        this.offsetLeft = -25;
    }
    
    setParent(parent: HTMLElement): void {
        this.parent = parent;
    }

    getHeight(): number {
        return this.element.offsetHeight;
    }

    getTop(): number {
        return parseInt(this.element.style.top);
    }

    setTop(top: number): void {
        const bound = this.leftMate.element.offsetHeight - this.getHeight();
        if(top > bound) {
            top = bound;
        } else if (top < 0) {
            top  = 0 ;
        }
        this.element.style.top = top + 'px';
    }

    setLeft(left: number) {
        /*const leftPane: Pane = this.leftMate;
        const rightPane: Pane = this.rightMate;
        const halfWidth: number = this.getWidth() / 2;
        const leftLimit: number = leftPane.getLeft() + leftPane.minWidth - halfWidth;
        const rightLimit: number = rightPane.getLeft() + rightPane.getWidth() - rightPane.minWidth - halfWidth;
        if(left < leftLimit) {
            left = leftLimit;
        } else if(left > rightLimit) {
            left = rightLimit;
        }*/
        super.setLeft(left);
    }

    private eventStartHandler(event: PointerEvent): void {
        event.preventDefault();
        this.pointerID = event.pointerId;
        const scale = 1 - this.scaleFactor;
        this.element.style.transform = 'scale(' + scale + ',' + scale +')';
        this.initX = Math.round(event.clientX);
        this.initY = event.clientY;
        this.initTop = this.getTop();
        document.addEventListener('pointermove', this.boundMouseMoveHandle = this.eventMoveHandler.bind(this));
        this.leftMate.initPosition();
        this.rightMate.setIsMoving(true);
    }

    private swapPanes(): void {
        let leftWidth = this.leftMate.getWidth();
        let leftLeft = this.leftMate.getLeft();
        let rightWidth = this.rightMate.getWidth();
        let rightLeft = this.rightMate.getLeft();
        let leftElement = this.leftMate.element;
        let rightElement = this.rightMate.element;
        let temp;

        temp = leftElement;
        this.leftMate.element = rightElement;
        this.rightMate.element = temp;

        this.leftMate.setWidth(leftWidth);
        this.leftMate.setLeft(leftLeft);
        this.rightMate.setWidth(rightWidth);
        this.rightMate.setLeft(rightLeft);
    }

    private eventMoveHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            event.preventDefault();
            const difX: number = Math.round(event.clientX) - this.initX;
            const difY: number = event.clientY - this.initY;

            this.setTop(this.initTop + difY);

            let parentOffset: number = this.parent.getBoundingClientRect().left;
            let dif: number = this.leftMate.getInitRight() + this.parent.getBoundingClientRect().left - this.initX;
            let position: number = Math.round(event.clientX) - parentOffset + dif;
            //this.leftMate.move(Math.round(event.clientX) - this.parent.getBoundingClientRect().left + (this.leftMate.getInitRight() + this.parent.getBoundingClientRect().left - this.initX));
            this.rightMate.move(position);
            //this.rightMate.adapt();
            //this.leftMate.adapt();
        }
    }

    private eventEndHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundMouseMoveHandle);
            this.element.style.transform = 'scale(1, 1)';
            if(this.rightMate.element.id != 'splitter-pane-2') this.rightMate.setIsMoving(false);
        }
    }
}