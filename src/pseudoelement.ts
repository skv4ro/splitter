export default abstract class PseudoElement {
    private left: number;
    private width: number;
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
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