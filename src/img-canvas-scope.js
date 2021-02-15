import ImageCache from './core/img-cache';

class ImgCanvasScope extends HTMLElement {
    constructor() {
        super();
        this.start = this.start.bind(this);
        this.settings = { debug: false };
    }

    static get observedAttributes() {
        return ['src'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src') {
            new ImageCache([newValue]);
            (document.readyState === 'loading') ? document.addEventListener('DOMContentLoaded', this.start) : this.start();
        }
    }

    setStyle() {
    }

    start() {
    }
}
customElements.define("img-canvas-scope", ImgCanvasScope);