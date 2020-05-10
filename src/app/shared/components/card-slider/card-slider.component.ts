import {Component, Input} from '@angular/core';
import {WalletDto} from '../../../home/shared/forms/wallet-form/dtos';
import {cardAnimation} from './card-animation';

@Component({
  selector: 'card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss'],
  animations: cardAnimation
})
export class CardSliderComponent {

  @Input() walletList: WalletDto[];

  active = 0;
  isSwipingRight = false;
  isSwipingLeft = true;

  switchCardOnRight() {
    this.isSwipingLeft = false;
    this.isSwipingRight = true;
    this.active = this.active > 0 ? this.active - 1 : this.active;
  }

  switchCardOnLeft() {
    this.isSwipingRight = false;
    this.isSwipingLeft = true;
    this.active = this.active < this.walletList.length - 1 ? this.active + 1 : this.active;
  }
}
