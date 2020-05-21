import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'iterate'
})
export class IteratePipe implements PipeTransform {
  transform(value) {
    return (new Array(value)).fill(1).map((_, i) => i);
  }
}
