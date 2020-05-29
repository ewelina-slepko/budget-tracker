import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {ApiService} from '../../../../shared/services/api.service';
import {WalletDto} from '../../../shared/forms/wallet-form/dtos';
import {IncomeDto} from '../../../shared/forms/income-form/dtos';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {formAnimation} from '../../../../shared/animations/form-animation';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: [basicAnimation, formAnimation]
})
export class WalletComponent implements OnInit {

  walletList: WalletDto[];
  incomesList: IncomeDto[];
  transactionsList: TransactionDto[];

  totalAmountOfMoney: number;
  totalIncome: number;
  totalOutcome: number;

  isNewWalletFormOpen = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getWalletList();
    this.getIncomes();
    this.getTransactionsList();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe(res => {
      this.walletList = res;
      this.totalAmountOfMoney = this.walletList.map(({amount}) => amount).sum();
    });
  }

  getIncomes() {
    this.apiService.getIncomesList().subscribe(res => {
      this.incomesList = res;
      this.totalIncome = res.map(({amount}) => amount).sum();
    });
  }

  getTransactionsList() {
    this.apiService.getTransactionsList().subscribe(res => {
      this.transactionsList = saveDocumentWithId(res).sortByDate();
      this.totalOutcome = this.transactionsList.map(({amount}) => amount).sum();
    });
  }
}
