import { Component, OnInit } from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';

@Component({
  selector: 'budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  animations: basicAnimation
})
export class BudgetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}