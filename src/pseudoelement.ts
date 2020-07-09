export default abstract class PseudoElement {
    private zIndex: number;
    private left: number;
    private width: number;
    element: HTMLElement;
    //offsetLeft: number = 0;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
    }

    getLeft(): number {
        //return parseInt(this.element.style.left);
        return this.left;
    }

    setLeft(left: number) {
        this.left = left;
        this.element.style.left = left + 'px';
    }

    getRight(): number {
        return this.getLeft() + this.getWidth();
    }

    getWidth(): number {
        //return this.element.offsetWidth;
        return this.width;
    }

    setWidth(width: number) {
        this.width = width;
        this.element.style.width = width + 'px';
    }

    setZIndex(zIndex: number) {
        this.zIndex = zIndex;
        this.element.style.zIndex = this.zIndex.toString();
    }
}