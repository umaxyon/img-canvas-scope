import { clone } from '../../core/util';

class View {
    constructor() {
        this.current = {x: 0, y: 0};
        this.prev = {x: 0, y: 0};
    }

    get x() {
        return this.current.x;
    }

    get y() {
        return this.current.y;
    }

    get preX() {
        return this.prev.x;
    }

    get preY() {
        return this.prev.y;
    }

    update(x, y) {
        this.prev = clone(this.current);
        this.current.x += x;
        this.current.y += y;
    }

    limit(limitX, limitY) {
        if (this.current.x > 0) this.current.x = 0;
        if (this.current.x < limitX) this.current.x = limitX;
        if (this.current.y > 0) this.current.y = 0;
        if (this.current.y < limitY) this.current.y = limitY;
    }

    velocity() {
        return {x: (this.current.x - this.prev.x), y: (this.current.y - this.prev.y)};
    }

    toString() {
        return `curX=${this.current.x} curY=${this.current.y} prevX=${this.prev.x} prevY=${this.prev.y}`;
    }
}
export default View;