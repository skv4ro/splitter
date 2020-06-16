export default class AbstractElement {
    private zIndex: number;
    element: HTMLElement;
    offsetLeft: number = 0;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
    }

    getLeft(): number {
        return parseInt(this.element.style.left);
    }

    setLeft(left: number) {
        this.element.style.left = left + 'px';
    }

    getRight(): number {
        return this.getLeft() + this.getWidth();
    }

    getWidth(): number {
        return this.element.offsetWidth;
    }

    setWidth(width: number) {
        this.element.style.width = width + 'px';
    }

    setZIndex(zIndex: number) {
        this.zIndex = zIndex;
        this.element.style.zIndex = this.zIndex.toString();
    }
}