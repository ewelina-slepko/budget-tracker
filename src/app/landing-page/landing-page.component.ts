import {Component} from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  slides = [
    'assets/images/landing-page/1.svg',
    'assets/images/landing-page/2.svg',
    'assets/images/landing-page/3.svg',
  ];

}
