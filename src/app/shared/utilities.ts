import * as moment from 'moment';
import {TransactionDto} from '../home/shared/forms/transaction-form/dtos';

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

export function getDaysInMonth() {
  const days = moment().daysInMonth();
  const month = moment().month();
  const year = moment().year();

  return [...Array(days)].map((_, i) => {
    const day = i + 1;
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`;
  });
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.sum = function() {
  return this.reduce((a, b) => a + b, 0);
};

Array.prototype.sortByDate = function() {
  return this.sort((a, b) => b.date.seconds - a.date.seconds);
};

declare global {
  interface Array<T> {
    sum(): number;
  }
}

declare global {
  interface Array<T> {
    sortByDate(): number;
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
