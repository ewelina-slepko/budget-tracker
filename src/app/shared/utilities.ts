export function setStyles(element, object, renderer) {
  Object.keys(object).map(key => renderer.setStyle(element, key, object[key]));
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};

declare global {
  interface Array<T> {
    sum(): number;
  }
}

