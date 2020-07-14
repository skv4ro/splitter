export default abstract class PseudoElement {
    private left: number = 0;
    private width: number = 0;
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.left = "0px";
        this.element.style.top = "0px";
    }

    
    /**
     * Returnt offsetHeight of mover element.
     */
    getHeight(): number {
        return this.element.offsetHeight;
    }

    /**
     * Returns left position of PseudoElement.
     */
    getLeft(): number {
        return this.left;
    }

    /**
     * Sets left position of PseudoElement and its element.
     */
    setLeft(left: number) {
        this.left = left;
        this.element.style.left = left + 'px';
    }

    /**
     * Returns right position of PseudoElement.
     */
    getRight(): number {
        return this.getLeft() + this.getWidth();
    }

    /**
     * Returns width of PseudoElement.
     */
    getWidth(): number {
        return this.width;
    }

    /**
     * Sets width of PseudoElement and its element.
     */
    setWidth(width: number) {
        this.width = width;
        this.element.style.width = width + 'px';
    }
}