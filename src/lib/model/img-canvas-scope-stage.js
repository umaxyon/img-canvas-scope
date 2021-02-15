import ImgCell from './parts/img-cell';

class ImgCanvasScopeStage {
    constructor(ics) {
        this.ics = ics;
        this.ics.stage = this;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.verticalAlign = "middle";
        this.canvas.style.boxSizing = "border-box";
        this.ics.appendChild(this.canvas);

        this.curView = { x: 0, y: 0 };
        this.prevView = { x: 0, y: 0 };

        this.target = null;
    }

    load() {
        this.target = new ImgCell(this.ics.getAttribute('src'));
    }

    debug() {
        if (this.ics.isDebug('stage')) {
            console.log(`[stage]  curX=${this.curView.x} curY=${this.curView.y} prevX=${this.prevView.x} prevY=${this.prevView.y}`);
        }
    }

    getSize() {
        const img = this.target.get();
        const w = Math.max(img.w, this.ics.clientWidth);
        const h = Math.max(img.h, this.ics.clientHeight);
        return { w, h };
    }

    resetCanvasSize() {
        const { w, h } = this.getSize();

        this.canvas.width = w;
        this.canvas.height = h;
    }

    isChangeView() {
        return this.prevView.x !== this.curView.x || this.prevView.y !== this.curView.y;
    }

    draw() {
        this.debug();
        
        this.resetCanvasSize();

        const img = this.target.get();
        const w = Math.min(this.ics.clientWidth, img.w);
        const h = Math.min(this.ics.clientHeight, img.h);

        this.target.setRect({x:-this.curView.x, y:-this.curView.y, w, h});
        this.target.draw(this.ctx);
    }
}
export default ImgCanvasScopeStage;
