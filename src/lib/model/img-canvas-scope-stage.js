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
    }

    debug() {
        if (this.ics.isDebug('stage')) {
            console.log(`[stage]  curX=${this.curView.x} curY=${this.curView.y} prevX=${this.prevView.x} prevY=${this.prevView.y}`);
        }
    }

    isChangeView() {
        return this.prevView.x !== this.curView.x || this.prevView.y !== this.curView.y;
    }

    draw() {
        this.debug();
        
        const img = new ImgCell(this.ics.getAttribute('src'));
        img.setRect({x:-this.curView.x, y:-this.curView.y, w:300, h:300});
        img.draw(this.ctx);
    }
}
export default ImgCanvasScopeStage;
