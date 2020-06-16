export default class AbstractElement {
    private zIndex: number;
    element: HTMLElement;
    offsetLeft: number = 0;
    offsetRight: number = 0;

    constructor() {
        this.element = AbstractElement.createPaneElement();
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

    private static createPaneElement(): HTMLElement {
        const element: HTMLElement = document.createElement('div');
        element.style.position = 'absolute';
        return element;
    }
}