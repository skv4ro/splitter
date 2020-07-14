import AttachedItem from "./attacheditem";
import Pane from "./pane";

export default class Mover extends AttachedItem {
    readonly pane: Pane;
    private initX: number = 0;
    private initY: number = 0;
    private initTop: number = 0;
    private pointerID: number;
    private boundMouseMoveHandle: EventListener;
    moveY: boolean = true;

    constructor(rightMate: Pane) {
        super();
        this.pane = rightMate;
        this.element.addEventListener('pointerdown', event => this.eventStartHandler(event));
        document.addEventListener('pointerup', event => this.eventEndHandler(event));
    }

    /**
     * Returns top position of movers element.
     */
    getTop(): number {
        return parseInt(this.element.style.top);
    }

    /**
     * Sets top position of mover's element. If position if larger or smaller then limit sets this limit.
     * @param top top position
     */
    setTop(top: number): void {
        const limit = this.pane.element.offsetHeight - this.getHeight();
        if(top > limit) {
            top = limit;
        } else if (top < 0) {
            top  = 0 ;
        }
        this.element.style.top = top + 'px';

    }


    /**
     * Handler when mover is "touched"
     * @param event pointer event
     */
    private eventStartHandler(event: PointerEvent): void {
        event.preventDefault();
        this.pointerID = event.pointerId;        
        this.initX = Math.round(event.clientX);
        this.initY = event.clientY;
        this.initTop = this.getTop();
        this.pane.setIsMoving(true);
        document.addEventListener('pointermove', this.boundMouseMoveHandle = this.eventMoveHandler.bind(this));
        
    }

    /**
     * Handler when mover moves.
     * @param event pointer event
     */
    private eventMoveHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            event.preventDefault();
            if(this.moveY) this.updateTop(event);
            this.movePane(event);
        }
    }

    /**
     * Updates top of the mover's element.
     * @param event pointer event
     */
    private updateTop(event: PointerEvent) {
        let difY: number = event.clientY - this.initY;
        this.setTop(this.initTop + difY);
        
    }

    /**
     * Move pane.
     * @param event pointer event
     */
    private movePane(event: PointerEvent) {
        let difX = this.pane.getInitLeft() - this.initX;
        let position: number = Math.round(event.clientX) + difX;
        this.pane.move(position);
    }

    /**
     * Handler when mover is no longer being "touched".
     * @param event pointer event
     */
    private eventEndHandler(event: PointerEvent): void {
        if(event.pointerId === this.pointerID) {
            document.removeEventListener('pointermove', this.boundMouseMoveHandle);
            this.pane.setIsMoving(false);
        }
    }

    /**
     * Assign default style for mover's element.
     */
    styleDefault(): void {
        let style: CSSStyleDeclaration = this.element.style;
        style.width = "50px";
        style.height = "50px";
        style.borderRadius = "25px";
        style.backgroundColor = "black";
        style.opacity = ".5";
    }
}