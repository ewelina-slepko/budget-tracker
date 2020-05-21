export function setStyles(element, object, renderer) {
  Object.keys(object).map(key => renderer.setStyle(element, key, object[key]));
}

export function saveDocumentWithId(list) {
  return list.map(document => {
    const documentData = document.payload.doc.data();
    const id = document.payload.doc.id;
    return {id, ...documentData};
  });
}

export function transformToDate(timestampValue) {
  return new Date(timestampValue * 1000);
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.sortFromHighestToLowest = function() {
  return this.sort((a, b) => b.date.seconds - a.date.seconds);
};

declare global {
  interface Array<T> {
    sum(): number;
  }
}

declare global {
  interface Array<T> {
    sortFromHighestToLowest(): number;
  }
}
