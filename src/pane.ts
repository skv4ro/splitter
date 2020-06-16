import AbstractElement from "./abstractelement";

export default class Pane extends AbstractElement {    
    minWidth: number = 50;
    private initLeft: number;
    private initWidth: number;
    private initRight: number; 
    readonly attachedItems: Pane[] = []; //items attached to right side of a pane
    readonly moveCallbacks: Function[] = [];
    leftPane: Pane; //relative left mate pane
    rightPane: Pane; //relative right mate pane
    isMoving: boolean; //true if pane is being moving by mover

    constructor() {
        super();
        this.setZIndex(0);
        //this.element.style.height = '100%';
        this.element.style.left = '0';
        this.element.setAttribute('class', 'splitter-pane');
    }

    /**
     * Runs move callbacks
     */
    runMoveCallbacks(): void {
        this.moveCallbacks.forEach(callback => {
            callback();
        })
    }

    /**
     * Attach item to this pane right's side
     * @param item New attached item
     */
    attachItem(item: Pane): void {
        this.attachedItems.push(item);
    }

    /**
     * Adapt right pane positions
     */
    adaptRight(): void {
        if(this.rightPane == undefined) return;
        let offset = this.leftPane.getRight();
        this.setLeft(offset);
        let width = this.rightPane.getLeft() - this.getLeft();
        if(width <= this.minWidth) {
            this.setWidth(this.minWidth);
            this.rightPane.adaptRight();
        } else {
            this.setWidth(width);  
        } 
    }

    /**
     * Adapt left pane positions
     */
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

    /**
     * Sets left position of attached element to the pane considering item leftOffset
     * @param position Left position of attached element
     */
    private adaptAttachedItems(position: number): void {
        this.attachedItems.forEach(item => {
            item.setLeft(position + item.offsetLeft);
        });
    }

    /**
     * Calculates maximal with of the pane
     */
    private getMaxWidth() {
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


    /**
     * Caluculates maximal left position of the pane
     */
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

    /**
     * Sets left position of the pane and also attached items
     * @param left Absolute left position
     */
    setLeft(left: number): void {
        super.setLeft(left);
        this.adaptAttachedItems(left);
    }

    /**
     * Moves right side of the pane to the specific position
     * @param position Right position of the pane
     */
    move(position: number): void {
        this.runMoveCallbacks();
        let width: number = position - this.getLeft();
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

    /**
     * Moves the pane by increment value
     * @param increment Increment to move the pane by
     */
    moveBy(increment: number): void {
        let initalPosition: number = this.getRight();
        this.move(initalPosition + increment);
    }

    /**
     * Sets initial positions of the pane before its moving
     */
    initPosition(): void {
        this.initLeft = this.getLeft();
        this.initWidth = this.getWidth();
        this.initRight = this.rightPane.getLeft();
    }

    /**
     * Return initial left position
     */
    getInitLeft(): number {
        return this.initLeft;
    }

    /**
     * Return initial width
     */
    getInitWidth(): number {
        return this.initWidth;
    }


    /**
     * Return initial right position
     */
    getInitRight(): number {
        return this.initRight;
    }
}