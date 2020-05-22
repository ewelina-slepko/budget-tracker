import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyPipe implements PipeTransform {

  transform(amount: number): string {
    if (amount != null) {
      return `${amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} zł`;
    }
  }
}
