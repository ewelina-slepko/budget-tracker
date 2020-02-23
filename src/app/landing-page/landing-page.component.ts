import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  active = 1;

  firstPage = 1;
  secondPage = 2;
  lastPage = 3;

  constructor() {
  }

  ngOnInit() {
  }

  toggleActiveOnClick(param: number) {
    this.active = param;
    this.active = param;
  }

  toggleActiveOnSwipeLeft() {
    return this.active < this.lastPage ? this.active++ : this.active = 1;
  }

  toggleActiveOnSwipeRight() {
    return this.active > this.firstPage ? this.active-- : this.active = 3;
  }

}
