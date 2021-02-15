class ImageCache {
    constructor(imagePathList) {
        const pathSet = new Set(imagePathList);
        ImageCache.pathSet = ImageCache.pathSet ? new Set([...ImageCache.pathSet, ...pathSet]) : pathSet;
        ImageCache.cache = ImageCache.cache || {}

        for (const nm of pathSet) {
            const img = new Image();
            img.onload = () => ImageCache.cache[nm] = { img, w: img.naturalWidth, h: img.naturalHeight }
            img.src = nm;
        }
    }

    static waitLoaded() {
        return new Promise(resolve => {
            setTimeout(function wait() {
                if (Object.keys(ImageCache.cache).length === ImageCache.pathSet.size) {
                    resolve(); 
                } else {
                    setTimeout(wait, 10); // TODO 最大wait時間
                }
            });
        });
    }
}

export default ImageCache;
