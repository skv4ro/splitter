export default abstract class PseudoElement {
    private left: number;
    private top: number;
    private height: number;
    private width: number;
    element: HTMLElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
    }

    setTop(top: number): void {
        this.top = top;
        this.element.style.top = top + "px";
    }

    getTop(): number {
        return this.top;
    }

    getLeft(): number {
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
        return this.width;
    }

    setWidth(width: number) {
        this.width = width;
        this.element.style.width = width + 'px';
    }

    getHeight(): number {
        return this.height;
    }

    setHeight(height: number) {
        this.height = height;
        this.element.style.height = height + 'px';
    }
}