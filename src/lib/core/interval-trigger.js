import { hasProperty } from './util';

class IntervalTrigger {
    constructor() {
        this.events = {};
        this._ev = {};
        this._force = {};
    }

    initEvent() {
        if (Object.keys(this._ev).length > 0 && this.now !== undefined) {
            for (const [k] of Object.entries(this._ev)) {
                this.events[k] = this._ev[k];
                this.events[k]['start'] = this.now;
                delete this._ev[k];
            }
        }
    }

    setEvent(key, fn, duration, timing) {
        if (!hasProperty(this._ev, key)) {
            this._ev[key] = { fn, duration: (duration || -1), timing:(timing || 20) };
        }
    }

    force(key) {
        this._force[key] = true;
        return this;
    }

    annimationFlash(timestamp) {
        this.update(timestamp);
        requestAnimationFrame(tm => this.annimationFlash.call(this, tm));
    }

    update(timestamp) {
        if (timestamp === undefined) return;

        this.now = Math.floor(timestamp);
        this.initEvent();
        const endEvents = [], tm = this.now;
        for (const [k, ev] of Object.entries(this.events)) {
            if ((tm - ev.start) > ev.timing) {
                const ctx = { start: ev.start, now: tm, duration: (tm - ev.start), force: !!this._force[k] }
                if (ev.fn(ctx)) {
                    if (ev.duration < 0 || ev.duration <= tm - ev.start) {
                        ev.start = tm;
                    } 
                } else {
                    endEvents.push(k);
                }
                delete this._force[k];
            }
        }
        endEvents.forEach(k => delete this.events[k]);
    }
}
export default IntervalTrigger;
