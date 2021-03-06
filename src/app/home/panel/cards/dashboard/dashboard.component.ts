import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';
import {WalletDto} from '../../../shared/forms/wallet-form/dtos';
import {TransactionDto} from '../../../shared/forms/transaction-form/dtos';
import {saveDocumentWithId} from '../../../../shared/utilities';
import {PanelService} from '../../panel.service';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: basicAnimation
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  userName: string;
  totalAmountOfMoney: number;

  walletList: WalletDto[];
  transactionsList: TransactionDto[] = [];

  constructor(private authService: AuthenticationService,
              private apiService: ApiService,
              private panelService: PanelService,
              private dashboardService: DashboardService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.displayName;
    this.getWalletList();
    this.getTransactionsList();
    this.listenOnNewTransactionInfo();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }

  listenOnNewTransactionInfo() {
    this.panelService.getNewTransactionInfo().subscribe(() => {
      this.getTransactionsList();
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
    });
  }

  get isTransactionsListEmpty() {
    return this.transactionsList?.length === 0;
  }

  logout() {
    this.authService.logout();
  }

  get noChartsData() {
    return this.dashboardService.visibleTransactionList.length === 0 &&
      this.dashboardService.currentMonthBudgetsSpendingList.length === 0 &&
      this.dashboardService.currentMonthBudgetsPercentList.length === 0;
  }
}
