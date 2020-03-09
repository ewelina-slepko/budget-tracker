import {Component, OnInit} from '@angular/core';
import {BalanceDto} from './dtos';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent {

  balance: BalanceDto[] = [];

  constructor() {
  }

  saveBalance(form) {
    console.log(form);
  }

}
