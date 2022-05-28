import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardDescription'
})
export class CardDescriptionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let newDesc: string = value.slice(0, 25);
    return newDesc;
  }

}
