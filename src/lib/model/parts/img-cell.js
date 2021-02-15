import ImageCache from "../../core/img-cache";

class ImgCell {
    constructor(path, rect) {
        this.path = path;
        this.rect = rect;
    }

    setRect(rect){
        this.rect = rect
    }

    getImg() {
        return ImageCache.cache[this.path].img;
    }

    draw(ctx) {
        if (this.rect) {
            const { x, y, w, h } = this.rect;
            ctx.drawImage(this.getImg(), x, y, w, h, 0, 0, w, h);
        }
    }
}
export default ImgCell;
