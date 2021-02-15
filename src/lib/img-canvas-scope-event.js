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

    mouseup(e) {
    }

    mousemove(e) {
        if (e.btn === 1 && e.cursorIn) {
            this.ics.stage.curView.x += e.dx;
            this.ics.stage.curView.y += e.dy;
        }
    }
}
export default ImgCanvasScopeEvent;
