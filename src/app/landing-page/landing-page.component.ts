import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  firstPage = 1;
  secondPage = 2;
  lastPage = 3;

  active = this.firstPage;

  toggleActiveOnClick(param: number) {
    this.active = param;
  }

  toggleActiveOnSwipeRight() {
    return this.active < this.lastPage ? this.active++ : this.active = this.firstPage;
  }

  toggleActiveOnSwipeLeft() {
    return this.active > this.firstPage ? this.active-- : this.active = this.lastPage;
  }

}
