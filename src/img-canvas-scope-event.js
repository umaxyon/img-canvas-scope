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
        if (e.type in this) this[e.type](e);
    }

    mouseup(e) {
    }

    mousemove(e) {
    }
}
export default ImgCanvasScopeEvent;
