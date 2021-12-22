import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumber'
})
export class CardNumberPipe implements PipeTransform {

  transform(value: string, ...args: any): string {
    let cardNo: string = value.slice(-4);
    return `ends with ...${cardNo}`;
  }

}
