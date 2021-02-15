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

        this.view = { x: 0, y: 0 };
    }

    debug() {
        if (this.ics.isDebug('stage')) {
            console.log(`[stage] x=${this.view.x} y=${this.view.y}`);
        }
    }

    draw() {
        this.debug();
        
        const img = new ImgCell(this.ics.getAttribute('src'));
        img.setRect({x:0, y:0, w:300, h:300});
        img.draw(this.ctx);
    }
}
export default ImgCanvasScopeStage;
