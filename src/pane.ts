import PseudoElement from "./pseudoelement";
import AttachedItem from "./attacheditem";

export default class Pane extends PseudoElement {    
    minWidth: number = 50;
    private initLeft: number;
    private initWidth: number;
    private initRight: number; 
    readonly attachedItems: AttachedItem[] = []; //items attached to left side of a pane
    readonly moveCallbacks: Function[] = [];
    leftPane: Pane; //relative left mate pane
    rightPane: Pane; //relative right mate pane
    isMoving: boolean; //true if pane is being moving by mover
    leftAnchor: Function = function(): number {
        //if(this.leftPane == undefined) return;
        return this.leftPane.getRight();
    }.bind(this);
    rightAnchor: Function = function(): number {
        //if(this.rightPane == undefined) return;
        return this.rightPane.getLeft();
    }.bind(this);
    //leftItems: Pane[] = [];
    //actualMinWidth: number = this.minWidth;
    maxLeft: number;
    minLeft: number;

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

    swap(): void {
        console.log(this);
        let leftWidth = this.leftPane.getWidth();
        let leftLeft = this.leftPane.getLeft();
        let rightWidth = this.getWidth();
        let rightLeft = this.getLeft();
        let leftElement = this.leftPane.element;
        let rightElement = this.element;
        let temp: HTMLElement;

        temp = leftElement;
        this.leftPane.element = rightElement;
        this.element = temp;

        this.leftPane.setWidth(leftWidth);
        this.leftPane.setLeft(leftLeft);
        this.setWidth(rightWidth);
        this.setLeft(rightLeft);
    }

    /**
     * Attach item to this pane right's side
     * @param item New attached item
     */
    attachItem(item: AttachedItem): void {
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
        let offset: number = this.leftPane.getRight();
        let width: number = this.rightPane.getLeft() - this.getLeft();
        if(width <= this.minWidth) {
            this.setLeft(this.rightPane.getLeft() - this.minWidth);
            this.setWidth(this.minWidth);
            this.leftPane.adaptLeft();
        } else {
            this.setLeft(offset);
            this.setWidth(width);
        } 
    }

    /**
     * Sets left position of attached element to the pane considering item leftOffset
     * @param position Left position of attached element
     */
    private adaptAttachedItems(position: number): void {
        this.attachedItems.forEach(item => {
            item.setLeft(position + item.offset);
        });
    }

    computeMaxLeft(): void {
        let topRightPane: Pane = this;
        let sumMaxLeft: number = 0;//topRightPane.minWidth;
        while(topRightPane.rightPane != undefined) {
            let assignedValue: number;
            assignedValue = topRightPane.minWidth;
            sumMaxLeft += assignedValue;
            topRightPane = topRightPane.rightPane;
        }
        this.maxLeft =  topRightPane.rightAnchor() - sumMaxLeft - topRightPane.minWidth;
    }

    computeMinLeft(): void {
        let topLeftPane: Pane = this.leftPane;
        let sumMinLeft: number = 0;
        while(topLeftPane != undefined) {
            let assignedValue: number;
            //assignedValue = topLeftPane.isMoving ? topLeftPane.getWidth() : topLeftPane.minWidth;
            assignedValue = topLeftPane.minWidth;
            sumMinLeft += assignedValue;
            topLeftPane = topLeftPane.leftPane;
        }
        this.minLeft = sumMinLeft;
    }

    updateLimits(): void {
        this.computeMinLeft();
        this.computeMaxLeft();
    }

    setWidth(width: number) {
        if(width <= this.minWidth) {
            width = this.minWidth;
        }
        super.setWidth(width);
    }

    adapt(): void {
        this.setWidth(this.rightAnchor() - this.getLeft());
    }

    setIsMoving(isMoving: boolean): void {
        this.isMoving = isMoving;
    }

    getIsMoving(): boolean {
        return this.isMoving;
    }

    setLeft(left: number): void {
        if(left >= this.maxLeft) {
            left = this.maxLeft;
        }
        if(left <= this.minLeft) {
            left = this.minLeft;
        }
        super.setLeft(left);
        this.adaptAttachedItems(left);
    }

    evaluatePosition(direction: boolean, position: number): number {
        let pane: Pane = direction ? this : this.leftPane;
        if(pane.computeWidth(direction, position) <= pane.minWidth) {
            if(direction) {
                if(pane.rightPane.isMoving) return pane.rightAnchor() - pane.minWidth;
                let sum: number = pane.minWidth;
                while((pane = pane.rightPane) != undefined) {
                    if(pane.isMoving) return pane.leftAnchor() - sum;
                    if(pane.computeWidth(direction, position + sum) > pane.minWidth) return position;
                    sum += pane.minWidth;
                }
            } else {
                if(pane.isMoving) return pane.leftAnchor() + pane.minWidth;
                let sum: number = pane.minWidth;
                while((pane = pane.leftPane) != undefined) {
                    if(pane.isMoving && pane.computeWidth(direction, position - sum) <= pane.minWidth) return pane.leftAnchor() + sum + pane.minWidth;
                    if(pane.computeWidth(direction, position - sum) > pane.minWidth) return position;
                    sum += pane.minWidth;
                }
            }
        }
        return position;
    }

    computeWidth(direction: boolean, position: number): number {
        if(direction) return this.rightAnchor() - position;
        else return position - this.leftAnchor();
    }

    move(position: number): void {
        let direction: boolean = position > this.getLeft() ? true : false;
        position = this.evaluatePosition(direction, position);

        this.setLeft(position);
        this.adapt();
        this.leftPane.adapt();
        if(direction) {
            if(this.getWidth() <= this.minWidth) {
                if(this.rightPane != undefined) {
                    this.rightPane.moveMate(direction, position + this.getWidth());    
                }
            }
        } else {
            if(this.leftPane.getWidth() <= this.leftPane.minWidth) {
                this.leftPane.moveMate(direction, position - this.leftPane.getWidth());
            }
        }
    }

    moveMate(direction: boolean, position: number): void {
        this.setLeft(position);
        this.adapt();
        if(this.getWidth() <= this.minWidth) {
            let pane: Pane = direction ? this.rightPane : this.leftPane;
            if(pane != undefined) {
                if(direction) {
                    pane.moveMate(direction, position + this.getWidth());
                } else {
                    pane.adapt();
                    pane.moveMate(direction, position - pane.getWidth());
                }
            }
        }
    }

    moveRight(position: number) {
        this.setLeft(position);
        this.adapt();
        if(this.getWidth() <= this.minWidth) {
            if(this.rightPane != undefined) {
                this.rightPane.moveRight(position + this.getWidth());
            }
        }
    }

    moveLeft(position: number): void {
        this.setLeft(position);
        this.adapt();
        if(this.getWidth() <= this.minWidth) {
            if(this.leftPane != undefined) {
                this.leftPane.adapt();
                this.leftPane.moveLeft(position - this.leftPane.getWidth());
            }
        }
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
        //this.initRight = this.rightPane.getLeft();
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