import { Pipe, PipeTransform } from '@angular/core';
import {Rental} from "../models/rental";

@Pipe({
  name: 'rentalFilter'
})
export class RentalFilterPipe implements PipeTransform {

  transform(value: Rental[], filterText: string): Rental[] {
    filterText = filterText ? filterText.toLocaleLowerCase(): "";

    return filterText? value.filter(c => c.brandName.toLocaleLowerCase()
      .includes(filterText)): value;
  }

}
