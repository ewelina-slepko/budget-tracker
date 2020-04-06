export function setStyles(element, object, renderer) {
  Object.keys(object).map(key => renderer.setStyle(element, key, object[key]));
}


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
