import ImageCache from './core/img-cache';
import ImageCanvasScopeAnimator from './img-canvas-scope-animator';

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
        this.style.width = `${this.getAttribute('width') || this.parentElement.offsetWidth}px`;
        const height = this.getAttribute('height') || this.parentElement.offsetHeight;
        if (height === 0 && this.parentElement.localName == 'body' && this.parentElement.offsetHeight === 0) height = 300;
        this.style.height = `${height}px`;
        this.style.display = 'block';
        this.style.boxSizing ='border-box';
        this.style.overflow = 'hidden';
        this.style.position = 'absolute';
    }

    async start() {
        const animator = await ImageCanvasScopeAnimator.getInstance(this);
        animator.start();
    }
}
customElements.define("img-canvas-scope", ImgCanvasScope);