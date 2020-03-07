import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss']
})
export class WalletFormComponent implements OnInit {

  balance = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
