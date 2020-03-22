import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'fillArray'
})
export class FillArrayPipe implements PipeTransform {
  transform(value) {
    return (new Array(value)).fill(1).map((_, i) => i);
  }
}
