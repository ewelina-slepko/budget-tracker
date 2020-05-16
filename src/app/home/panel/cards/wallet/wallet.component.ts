import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {ApiService} from '../../../../shared/services/api.service';
import {WalletDto} from '../../../shared/forms/wallet-form/dtos';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: basicAnimation
})
export class WalletComponent implements OnInit {

  walletList: WalletDto[];
  totalAmountOfMoney: number;
  totalIncome: number;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getWalletList();
    this.getIncomes();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe(res => {
      this.walletList = res;
      this.totalAmountOfMoney = this.walletList.map(({amount}) => amount).sum();
    });
  }

  getIncomes() {
    this.apiService.getIncomesList().subscribe(res => {
      this.totalIncome = res.map(({amount}) => amount).sum();
    });
  }
}
