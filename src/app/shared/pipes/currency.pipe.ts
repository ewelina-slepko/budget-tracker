import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyPipe implements PipeTransform {

  transform(amount, ...args: any[]): any {

    if (amount || amount === 0) {
      amount = Number(amount).toFixed(2);
      const transformedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return `${transformedAmount} zł`;
    }
  }
}
