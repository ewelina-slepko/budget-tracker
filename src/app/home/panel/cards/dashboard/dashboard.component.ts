import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';
import {WalletDto} from '../../../shared/forms/wallet-form/dtos';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {PanelService} from '../../panel.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: basicAnimation
})
export class DashboardComponent implements OnInit {

  userName: string;
  totalAmountOfMoney: number;

  walletList: WalletDto[];
  transactionsList: TransactionDto[] = [];

  constructor(private authService: AuthenticationService,
              private apiService: ApiService,
              private panelService: PanelService) {
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.displayName;
    this.getWalletList();
    this.getTransactionsList();
    this.listenOnNewTransactionInfo();
  }

  listenOnNewTransactionInfo() {
    this.panelService.getNewTransactionInfo().subscribe(() => {
      this.getTransactionsList()
    });
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe((res) => {
      this.walletList = res;
      this.totalAmountOfMoney = this.walletList.map(({amount}) => amount).sum();
    });
  }

  getTransactionsList() {
    this.apiService.getTransactionsList().subscribe(res => {
      this.transactionsList = saveDocumentWithId(res);
      console.log(this.transactionsList)
    });
  }

  get isWalletListEmpty() {
    return this.walletList?.length === 0;
  }
}
