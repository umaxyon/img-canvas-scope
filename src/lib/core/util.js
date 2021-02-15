export function clone(ob) {
    return JSON.parse(JSON.stringify(ob));
}

export function hasProperty(obj, key) {
    return !!(obj) && Object.prototype.hasOwnProperty.call(obj, key);
}
