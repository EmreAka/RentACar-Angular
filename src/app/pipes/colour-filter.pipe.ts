import { Colour } from './../models/colour';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colourFilter'
})
export class ColourFilterPipe implements PipeTransform {

  transform(value: Colour[], filterText: string): Colour[] {
    filterText = filterText? filterText.toLocaleLowerCase(): "";

    return filterText? value.filter(c => c.name.toLocaleLowerCase()
      .includes(filterText)): value;
  }

}
