import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isActive = 1;

  constructor() {
  }

  ngOnInit() {
  }

  toggleActive(param: number) {
    this.isActive = param;
  }

}
