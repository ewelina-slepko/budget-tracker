import { Component, OnInit } from '@angular/core';
import {basicAnimation} from '../../../../shared/animations/basic-animation';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: basicAnimation
})
export class TransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
