import PseudoElement from "./pseudoelement";
import AttachedItem from "./attacheditem";

export default class Pane extends PseudoElement {    
    private initLeft: number;
    private maxLeft: number;
    private minLeft: number;
    private isMoving: boolean; 
    readonly attachedItems: AttachedItem[] = []; 
    minWidth: number = 50;
    leftPane: Pane; 
    rightPane: Pane; 
    leftAnchor: Function = this.defaultLeftAnchor;
    rightAnchor: Function = this.defaultRightAnchor;

    private defaultLeftAnchor(): number {
        return this.leftPane.getRight();
    }

    private defaultRightAnchor(): number {
        return this.rightPane.getLeft();
    }

    updateAnchors(): void {
        if(this.leftPane != undefined) this.leftAnchor = this.defaultLeftAnchor;
        if(this.rightPane != undefined) this.rightAnchor = this.defaultRightAnchor;
    }

    /**
     * Assign default style for pane's element.
     */
    styleDefault(): void {
        let style: CSSStyleDeclaration = this.element.style;
        style.height = "100%";
    }

    /**
     * Sets width. If width is lower than limit sets the limit.
     * @param width width do assign
     */
    setWidth(width: number) {
        if(width <= this.minWidth) {
            width = this.minWidth;
        }
        super.setWidth(width);
    }

    /**
     * Sets left. If left is lower or greated than limit sets the limit.
     * @param left left to assign
     */
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

    /**
     * Swap element of this pane with its left mate pane.
     */
    swap(): void {
        this.swapPanes(this.leftPane);
    }

    swapPanes(pane: Pane): void {
        let width2 = pane.getWidth();
        let left2 = pane.getLeft();
        let width = this.getWidth();
        let left = this.getLeft();
        let element2 = pane.element;
        let element = this.element;
        let temp: HTMLElement;

        temp = element2;
        pane.element = element;
        this.element = temp;

        pane.setWidth(width2);
        pane.setLeft(left2);
        this.setWidth(width);
        this.setLeft(left);
    }

    /**
     * Attach item to this pane left's side.
     * @param item New attached item
     */
    attachItem(item: AttachedItem): void {
        this.attachedItems.push(item);
    }

    /**
     * Sets left position of attached element to the pane considering item offset.
     * @param position Left position of attached element
     */
    private adaptAttachedItems(position: number): void {
        this.attachedItems.forEach(item => {
            item.setLeft(position + item.offset);
        });
    }

    removeAttachedItemsFromDom() {
        for(let item of this.attachedItems) {
            item.element.remove();
        }
    }

    /**
     * Compute maximul left of a pane.
     */
    private computeMaxLeft(): void {
        let topRightPane: Pane = this;
        let sumMaxLeft: number = 0;
        while(topRightPane.rightPane != undefined) {
            sumMaxLeft += topRightPane.minWidth;
            topRightPane = topRightPane.rightPane;
        }
        this.maxLeft =  topRightPane.rightAnchor() - sumMaxLeft - topRightPane.minWidth;
    }

    /**
     * Compute minimal left of a pane.
     */
    private computeMinLeft(): void {
        let topLeftPane: Pane = this.leftPane;
        let sumMinLeft: number = 0;
        while(topLeftPane != undefined) {
            sumMinLeft += topLeftPane.minWidth;
            topLeftPane = topLeftPane.leftPane;
        }
        this.minLeft = sumMinLeft;
    }

    /**
     * Update maximal a minimal left position of pane.
     */
    updateLimits(): void {
        this.computeMinLeft();
        this.computeMaxLeft();
        this.updateAnchors();
    }

    /**
     * Updates width of a pane.
     */
    adapt(): void {
        this.setWidth(this.rightAnchor() - this.getLeft());
    }

    /**
     * Sets status that tells if a pane is being moved by someone or something.
     * @param isMoving if pane is being moved
     */
    setIsMoving(isMoving: boolean): void {
        this.isMoving = isMoving;
        this.initLeft = this.getLeft();
    }

    /**
     * Gets status if pane is being moved.
     */
    getIsMoving(): boolean {
        return this.isMoving;
    }

    /**
     * Evaluates if a pane can be moved to new position. If not, limit position is returned.
     * @param direction true if right, false if left
     * @param position new position of a pane
     */
    private evaluatePosition(direction: boolean, position: number): number {
        let pane: Pane = direction ? this : this.leftPane;
        if(pane.computeWidth(direction, position) <= pane.minWidth) {
            if(direction) {
                if(pane.rightPane == undefined) return position;
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

    /**
     * Compute width which will pane has if it change position
     * @param direction true if right, false if left
     * @param position new position of a pane
     */
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

    /**
     * Moves left or right pane to its new position.
     * @param direction right if true, left if false
     * @param position new position to set
     */
    private moveMate(direction: boolean, position: number): void {
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

    /**
     * Moves the pane by increment value
     * @param increment Increment to move the pane by
     */
    moveBy(increment: number): void {
        let initalPosition: number = this.getRight();
        this.move(initalPosition + increment);
    }

    /**
     * Return initial left position assigned by isMoving() method.
     */
    getInitLeft(): number {
        return this.initLeft;
    }
}