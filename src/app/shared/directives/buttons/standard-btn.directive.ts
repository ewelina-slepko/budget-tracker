import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';
import {setStyles} from '../../utilities';

@Directive({
  selector: '[standardBtn]'
})
export class StandardBtnDirective implements OnInit {

  standardBtn = {
    backgroundColor: '#4E4BED',
    width: '100%',
    color: '#fff',
    border: 'none',
    textDecoration: 'none',
    outline: 'none',
    padding: '0.8rem 2rem',
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
