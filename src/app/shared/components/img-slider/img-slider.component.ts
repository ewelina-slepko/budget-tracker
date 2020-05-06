import {Component, Input} from '@angular/core';
import {slideAnimation} from './animation';

@Component({
  selector: 'img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.scss'],
  animations: slideAnimation
})

export class ImgSliderComponent {

  @Input() slides: string[];

  active = 0;
  isSwipingLeft = false;
  isSwipingRight = true;

  toggleActiveOnClick(param: number) {
    this.active = param;
  }

  toggleActiveOnSwipeRight() {
    this.isSwipingLeft = false;
    this.isSwipingRight = true;
    this.active = this.active < this.slides.length - 1 ? this.active + 1 : 0;
  }

  toggleActiveOnSwipeLeft() {
    this.isSwipingRight = false;
    this.isSwipingLeft = true;
    this.active = this.active > 0 ? this.active - 1 : this.slides.length - 1;
  }
}
