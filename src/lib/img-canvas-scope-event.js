import { clone } from './core/util';

class ImgCanvasScopeEvent {
    constructor(ics) {
        this.ics = ics;
        this.ics.event = this;
        this.setEventListener();
    }

    setEventListener() {
        for(const eventType of ['mousemove', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave']) {
            this.ics.addEventListener(eventType, this, false);
        }

        new ResizeObserver(entries => {
            const target = entries[0];
            this.ics.style.width = `${target.contentRect.width}px`;
            if (target.contentRect.height > 0) {
                this.ics.style.height = `${target.contentRect.height}px`;
            }
            this.ics.stage.resetCanvasSize();
            this.ics.stage.draw();
        }).observe(this.ics.parentElement);
    }

    handleEvent(e) {
        if (e.type in this) this[e.type](this.calculateEventLocation(e));
    }

    calculateEventLocation(e) {
        const bRect = e.target.getBoundingClientRect && e.target.getBoundingClientRect() || { left: 0, top: 0 };
        const btn = e.buttons !== undefined && e.type !== 'mouseup' ? e.buttons : e.button || e.which;
        const touch = e.changedTouches && e.changedTouches[0];
        const x = (touch && touch.clientX || e.clientX) - Math.floor(bRect.left);
        const y = (touch && touch.clientY || e.clientY) - Math.floor(bRect.top);
        const dx = touch ? x - this.loc.x : e.movementX;
        const dy = touch ? y - this.loc.y : e.movementY;
        this.loc = { x, y };
        const {top, bottom, left, right} = this.ics.getBoundingClientRect();
        const cursorIn =  left <= e.clientX && e.clientX <= right && bottom >= e.clientY && e.clientY >= top;
        return { type: e.type, x, y, dx, dy, btn, cursorIn };
    }

    mouseup() {
        const velocityX = this.ics.stage.curView.x - this.ics.stage.prevView.x;
        const velocityY = this.ics.stage.curView.y - this.ics.stage.prevView.y;
        const decayTime = 600;

        this.ics.trigger.setEvent('drag_smooth', (ctx) => {
            let vx = velocityX, vy = velocityY;
            return (() => {
                this.ics.stage.debug('drag_sm', `duration=${ctx.duration} vx=${vx} vy=${vy}`);

                vx -= (vx * (ctx.duration / decayTime));
                vy -= (vy * (ctx.duration / decayTime));

                this.ics.stage.curView.x += vx;
                this.ics.stage.curView.y += vy;
    
                return (ctx.duration < decayTime) 
            })();
        }, decayTime);
    }

    mousemove(e) {
        if (e.btn === 1 && e.cursorIn) {
            this.ics.stage.prevView = clone(this.ics.stage.curView);

            this.ics.stage.curView.x += e.dx;
            this.ics.stage.curView.y += e.dy;

            if (this.ics.settings.limit) {
                const size = this.ics.stage.getSize();
                const limitX = 0 - (size.w - this.ics.clientWidth);
                const limitY = 0 - (size.h - this.ics.clientHeight);
    
                if (this.ics.stage.curView.x > 0) this.ics.stage.curView.x = 0;
                if (this.ics.stage.curView.x < limitX) this.ics.stage.curView.x = limitX;
                if (this.ics.stage.curView.y > 0) this.ics.stage.curView.y = 0;
                if (this.ics.stage.curView.y < limitY) this.ics.stage.curView.y = limitY;
            }
        }
    }
}
export default ImgCanvasScopeEvent;
