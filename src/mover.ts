import AttachedItem from "./attacheditem";
import Pane from "./pane";
import * as Hammer from "hammerjs";

export default class Mover extends AttachedItem {
    readonly pane: Pane;
    private initX: number = 0;
    private initY: number = 0;
    private initTop: number = 0;
    private scaleFactor: number = .2;
    private boundMouseMoveHandle: EventListener;
    private pointerID: number;
    root: HTMLElement;

    constructor(rightMate: Pane) {
        super();
        this.pane = rightMate;
        this.element.setAttribute('class', 'splitter-mover');

        this.element.addEventListener('pointerdown', event => this.eventStartHandler(event));
        document.addEventListener('pointerup', event => this.eventEndHandler(event));

        const hammertime = new Hammer(this.element);
        hammertime.on("doubletap", () => this.pane.swap());

        this.offset = -25;
    }
    
    setParent(parent: HTMLElement): void {
        this.root = parent;
    }

    getHeight(): number {
        return this.element.offsetHeight;
    }

    getTop(): number {
        return parseInt(this.element.style.top);
    }

    setTop(top: number): void {
        const bound = this.pane.element.offsetHeight - this.getHeight();
        if(top > bound) {
            top = bound;
        } else if (top < 0) {
            top  = 0 ;
        }
        this.element.style.top = top + 'px';
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
        this.pane.setIsMoving(true);
    }

    private eventMoveHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            event.preventDefault();
            const difY: number = event.clientY - this.initY;

            this.setTop(this.initTop + difY);

            let dif: number = this.pane.getInitLeft() - this.initX;
            let position: number = Math.round(event.clientX) + dif;

            this.pane.move(position);
        }
    }

    private eventEndHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundMouseMoveHandle);
            this.element.style.transform = 'scale(1, 1)';
            this.pane.setIsMoving(false);
        }
    }
}