import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wallet-main-info',
  templateUrl: './wallet-main-info.component.html',
  styleUrls: ['./wallet-main-info.component.scss']
})
export class WalletMainInfoComponent {

  @Input() name: string;
  @Input() amount: number;

}
