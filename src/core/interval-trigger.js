class IntervalTrigger {
    constructor() {
        this.events = {};
        this._ev = {}
    }

    initEvent() {
        if (Object.keys(this._ev).length > 0 && this.now !== undefined) {
            for (const [k, ev] of Object.entries(this._ev)) {
                this.events[k] = this._ev[k];
                this.events[k]['start'] = this.now;
                delete this._ev[k]
            }
        }
    }

    setEvent(key, fn, duration, timing) {
        if (!this._ev.hasOwnProperty(key)) {
            this._ev[key] = { fn, duration: (duration || -1), timing:(timing || 20) };
        }
    }

    annimationFlash(timestamp) {
        this.update(timestamp);
        requestAnimationFrame(tm => this.annimationFlash.call(this, tm));
    }

    update(timestamp) {
        if (timestamp === undefined) return;
    }
}
export default IntervalTrigger;
