import { Component, OnInit } from '@angular/core';
import {basicAnimation} from '../../../../shared/animation';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: basicAnimation
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}