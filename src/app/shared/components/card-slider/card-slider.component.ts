import {Component, Input, OnInit} from '@angular/core';
import {WalletDto} from '../../../home/shared/forms/wallet-form/dtos';

@Component({
  selector: 'card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent implements OnInit {

  @Input() walletList: WalletDto[];

  constructor() { }

  ngOnInit(): void {
  }

}
