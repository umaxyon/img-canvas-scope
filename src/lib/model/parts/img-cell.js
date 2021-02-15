import ImageCache from "../../core/img-cache";

class ImgCell {
    constructor(path, rect) {
        this.path = path;
        this.rect = rect;
    }

    setRect(rect){
        this.rect = rect
    }

    get() {
        return ImageCache.cache[this.path];
    }

    draw(ctx) {
        if (this.rect) {
            const { x, y, w, h } = this.rect;
            ctx.drawImage(this.get().img, x, y, w, h, 0, 0, w, h);
        }
    }
}
export default ImgCell;
