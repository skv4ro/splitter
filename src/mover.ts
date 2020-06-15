import {AbstractElement} from "./abstractelement";
import {Pane} from "./pane";
import * as Hammer from "hammerjs";

export class Mover extends AbstractElement {
    readonly leftMate: Pane;
    readonly rightMate: Pane;
    private initX: number = 0;
    private initY: number = 0;
    private initLeft: number = 0;
    private initTop: number = 0;
    private scaleFactor: number = .2;
    private boundMouseMoveHandle: EventListener;
    private pointerID: number;
    parent: HTMLElement;

    private leftMateInit: number;

    constructor(leftMate: Pane, rightMate: Pane) {
        super();
        this.leftMate = leftMate;
        this.rightMate = rightMate;
        this.element.setAttribute('class', 'splitter-mover');

        //this.element.addEventListener('dblclick', () => this.dblClickHandler());
        this.element.addEventListener('pointerdown', event => this.eventStartHandler(event));
        document.addEventListener('pointerup', event => this.eventEndHandler(event));

        const hammertime = new Hammer(this.element);
        hammertime.on("doubletap", () => this.dblClickHandler());
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
        const leftPane: Pane = this.leftMate;
        const rightPane: Pane = this.rightMate;
        const halfWidth: number = this.getWidth() / 2;
        const leftLimit: number = leftPane.getLeft() + leftPane.minWidth - halfWidth;
        const rightLimit: number = rightPane.getLeft() + rightPane.getWidth() - rightPane.minWidth - halfWidth;
        if(left < leftLimit) {
            left = leftLimit;
        } else if(left > rightLimit) {
            left = rightLimit;
        }
        super.setLeft(left);
    }

    private eventStartHandler(event: PointerEvent): void {
        event.preventDefault();
        this.pointerID = event.pointerId;
        const scale = 1 - this.scaleFactor;
        this.element.style.transform = 'scale(' + scale + ',' + scale +')';
        this.initX = Math.round(event.clientX);
        //console.log(event.clientX);
        this.initY = event.clientY;
        this.initLeft = this.getLeft();
        this.initTop = this.getTop();
        document.addEventListener('pointermove', this.boundMouseMoveHandle = this.eventMoveHandler.bind(this));
        //this.leftMateInit = this.leftMate.getLeft() + this.leftMate.getWidth();
        this.leftMate.initPosition();
        this.leftMate.isMoving = true;
        //this.rightMate.initPosition();
    }

    private dblClickHandler(): void {
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
            this.setLeft(this.initLeft + difX);
            //const moverOffset = this.getLeft() + this.getWidth() / 2;
            //let offset = this.leftMateInit + difX;
            //this.leftMate.element.innerHTML = this.leftMateInit + "\n" + this.leftMate.getInitRight();

            //this.leftMate.move(difX);
            this.leftMate.moveTest(Math.round(event.clientX) - this.parent.getBoundingClientRect().left + (this.leftMate.getInitRight() + this.parent.getBoundingClientRect().left - this.initX));
            //this.rightMate.moveTest(Math.round(event.clientX) - this.parent.getBoundingClientRect().left + (this.rightMate.getInitLeft() + this.parent.getBoundingClientRect().left - this.initX));
            //this.leftMate.setWidth(offset - this.leftMate.getLeft());
            //this.rightMate.setWidth(this.rightMate.getLeft() + this.rightMate.getWidth() - offset);
            //this.rightMate.setLeft(offset);
            //this.rightMate.adapt(offset);
        }
    }

    private eventEndHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundMouseMoveHandle);
            this.element.style.transform = 'scale(1, 1)';
            this.leftMate.isMoving = false;
        }
    }
}