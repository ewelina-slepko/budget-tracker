import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {setStyles} from '../shared-utilities';

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
    padding: '0.8rem 0',
    borderRadius: '30px',
    margin: '1rem 0',
    fontSize: '1.2rem',
    fontWeight: '600',
    cursor: 'pointer'
  };

  constructor(private element: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    setStyles(this.element.nativeElement, this.standardBtn, this.renderer);
  }
}
