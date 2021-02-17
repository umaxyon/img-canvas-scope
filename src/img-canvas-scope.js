import ImageCache from './lib/core/img-cache';
import ImageCanvasScopeAnimator from './lib/img-canvas-scope-animator';

class ImgCanvasScope extends HTMLElement {
    constructor() {
        super();
        this.start = this.start.bind(this);
        this.settings = { debug: { allStop: false, animator: false, stage: true }, limit: true, defaultHeight: '100%' };
    }

    isDebug(key) {
        return !this.settings.debug.allStop && this.settings.debug[key];
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
        const getSize = val => Number.isFinite(val) ? `${val}px` : val;
        const parent = this.parentElement;
        if (!parent.offsetHeight) {
            parent.removeChild(this);
            const div = document.createElement('div');
            div.style.boxSizing ='border-box';
            div.style.height = getSize(this.settings.defaultHeight);
            div.style.width = '100%';
            div.appendChild(this);
            parent.appendChild(div);
        }

        this.style.width = getSize(this.getAttribute('width') || this.parentElement.offsetWidth);
        let height = this.getAttribute('height') || this.parentElement.offsetHeight;
        if (height === 0) height = this.settings.defaultHeight;
        this.style.height = getSize(height);
        this.height = height;
        this.style.display = 'block';
        this.style.boxSizing ='border-box';
        this.style.overflow = 'hidden';
        this.style.position = 'absolute';
    }

    async start() {
        this.setStyle();
        const animator = await ImageCanvasScopeAnimator.getInstance(this);
        animator.start();
    }
}
customElements.define("img-canvas-scope", ImgCanvasScope);