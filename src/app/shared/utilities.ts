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
    .map(transaction => moment(transaction.date).format('DD/MM/YYYY')))]
  // Formatted dates to string because javascript doesn't see duplicated dates in date format
    .map((date: string) => moment(date, 'DD/MM/YYYY').toDate())
    // After creating new Array with unique dates, transformed string to date format
    .map(date => (
      {
        date,
        amount: this
          .filter(transaction => transaction.date.isSameDate(date))
          .reduce((a, b) => a + b.amount, 0)

      }
    ));
};

Array.prototype.sumDuplicatedBudgetsAmounts = function() {
  return [...new Set(this
    .map(transaction => transaction.budgetId))]
    .reduce((prev: object, budgetId: string) => {
      return {
        ...prev,
        [budgetId]: this.filter(transaction => transaction.budgetId === budgetId).reduce((a, b) => a + b.amount, 0)
      };
    }, {});
};

Array.prototype.maxNumber = function() {
  return Math.max(...this);
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

Array.prototype.sortDescendingly = function(a: number, b: number): number[] {
  return this.sort((a, b) => b - a);
};

Array.prototype.removeDuplicates = function() {
  return this.reduce((unique, element) => unique.includes(element) ? unique : [...unique, element], []);
};

Array.prototype.countDuplicates = function() {
  return this.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});
};

Date.prototype.isSameDate = function(date: Date): boolean {
  return moment(this).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY');
};

Date.prototype.toMonthString = function() {
  return moment(this).format('MMM');
};

declare global {
  interface Array<T> {
    sum(): number;

    sortDescendingly(a: number, b: number): number[];

    sortByDate(): number;

    removeDuplicates(): any;

    countDuplicates(): string[];

    sumDuplicatedDaysAmounts();

    maxNumber(): number;

    sumDuplicatedBudgetsAmounts(): any;
  }
}

declare global {
  interface Date {
    isSameDate(date: Date): boolean;

    toMonthString(): string;
  }
}
