import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {setStyles} from '../utilities';

@Directive({
  selector: '[standardBtn]'
})
export class StandardBtnDirective implements OnInit {

  standardBtn = {
    backgroundColor: '#4E4BED',
    color: '#fff',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
    width: '300px',
    height: '40px',
    borderRadius: '20px'
  };

  constructor(private element: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    setStyles(this.element.nativeElement, this.standardBtn, this.renderer);
  }
}
