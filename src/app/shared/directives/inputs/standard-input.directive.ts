import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {setStyles} from '../utilities';

@Directive({
  selector: '[standardInput]'
})
export class StandardInputDirective implements OnInit {

  standardInput = {
    background: 'transparent',
    width: '100%',
    border: 'none',
    borderBottom: '2px solid #27E0C1',
    margin: '5px',
    outline: 'none'
  };

  constructor(private element: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    setStyles(this.element.nativeElement, this.standardInput, this.renderer);
  }
}
