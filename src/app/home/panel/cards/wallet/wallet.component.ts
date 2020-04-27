import {Component, OnInit} from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';
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

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getWalletList();
  }

  getWalletList() {
    this.apiService.getWalletList().subscribe(res => this.walletList = res);
  }
}
