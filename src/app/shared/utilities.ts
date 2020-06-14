import * as moment from 'moment';

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

export function getDaysInMonth(month) {
  const days = moment(month).daysInMonth();
  return [...Array(days)].map((_, i) => {
    return moment(month).startOf('month').add(i, 'days').format('DD/MM/YYYY');
  });
}

export function transformToDate(timestampValue) {
  return new Date(timestampValue * 1000);
}

Array.prototype.sumDuplicatedDaysAmounts = function() {
  return [...new Set(this
    .map(transaction => transaction.date))]
    .map(date => (
      {
        date,
        amount: this
          .filter(transaction => transaction.date === date)
          .reduce((a, b) => a + b.amount, 0)
      }
    ));
};

Array.prototype.maxNumber = function() {
  return Math.max.apply(null, this);
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.sortByDate = function() {
  return this.sort((a, b) => b.date.seconds - a.date.seconds);
};

Array.prototype.sortDescendingly = function() {
  return this.sort((a, b) => b - a);
};

Array.prototype.removeDuplicates = function() {
  return this.reduce((unique, element) => unique.includes(element) ? unique : [...unique, element], []);
};

declare global {
  interface Array<T> {
    sum(): number;
  }
}

declare global {
  interface Array<T> {
    sortDescendingly(): number[];
  }
}

declare global {
  interface Array<T> {
    sortByDate(): number;
  }
}

declare global {
  interface Array<T> {
    removeDuplicates(): any;
  }
}

declare global {
  interface Array<T> {
    sumDuplicatedDaysAmounts();
  }
}

declare global {
  interface Array<T> {
    maxNumber(): number;
  }
}
