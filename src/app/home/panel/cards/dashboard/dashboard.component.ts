import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';
import {AuthenticationService} from '../../../../authentication/authentication.service';
import {ApiService} from '../../../../shared/services/api.service';
import {WalletDto} from '../../../shared/forms/wallet-form/dtos';

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

  constructor(private authService: AuthenticationService,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.userName = this.authService.currentUser.displayName;
    this.getWalletList();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe((res) => {
      this.walletList = res;
      this.totalAmountOfMoney = this.walletList.map(({amount}) => amount).sum();
    });
  }

  get isWalletListEmpty() {
    return this.walletList?.length === 0;
  }
}
