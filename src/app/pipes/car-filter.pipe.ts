import { Car } from './../models/car';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Car[], filterText: string): Car[] {
    filterText = filterText? filterText.toLocaleLowerCase(): "";

    return filterText? value.filter((c:Car) => c.brandName.toLocaleLowerCase()
    .includes(filterText)): value;
  }

}
