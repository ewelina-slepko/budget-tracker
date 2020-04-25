import { Component, OnInit } from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';

@Component({
  selector: 'wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  animations: basicAnimation
})
export class WalletComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
