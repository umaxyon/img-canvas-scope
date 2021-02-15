import ImageCache from './core/img-cache';
import IntervalTrigger from './core/interval-trigger';
import ImgCanvasScopeStage from './model/img-canvas-scope-stage';
import ImgCanvasScopeEvent from './img-canvas-scope-event';

class ImageCanvasScopeAnimator extends IntervalTrigger {
    constructor(ics) {
        super();
        this.ics = ics;
        this.ics.trigger = this;
        this.ics.setStyle();
        
        this.stage = new ImgCanvasScopeStage(this.ics);
        this.event = new ImgCanvasScopeEvent(this.ics);

        super.setEvent('main_loop', this.loop.bind(this), 1, 1);
    }

    loop(ctx) {
        console.log(`[loop] ctx.duration=${ctx.duration}`);
        if (ctx.force) {
            this.stage.draw()
        }
        return true;
    }

    static async getInstance(ics) {
        await ImageCache.waitLoaded();
        return new ImageCanvasScopeAnimator(ics);
    }

    start() {
        super.force('main_loop').annimationFlash();
    }
}

export default ImageCanvasScopeAnimator;
