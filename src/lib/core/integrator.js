class Integrator {
    constructor(velocity) {
        this.velocity = velocity;
        this._x = this.velocity.x;
        this._y = this.velocity.y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    update(duration) {
        this._x = this.velocity.x - (this.velocity.x * (duration / this.endTime));
        this._y = this.velocity.y - (this.velocity.y * (duration / this.endTime));
    }

    toAfterMillisec(millisec) {
        this.endTime = millisec;
        return this;
    }
}
export default Integrator;
