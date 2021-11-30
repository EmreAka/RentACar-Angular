import { ColourService } from './../../services/colour.service';
import { BrandService } from './../../services/brand.service';
import { Colour } from './../../models/colour';
import { Brand } from './../../models/brand';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[] = [];
  colours:Colour[] = [];
  brandsLoaded:boolean = false;
  coloursLoaded:boolean = false;

  filterForm:FormGroup;

  constructor(private brandService:BrandService, private colourService:ColourService,
    private form:FormBuilder) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColours();
    this.filterForm = this.form.group({
      brandId: [null],
      colourId: [null]
    })
  }

  submit(){
    console.log("Form submitted.");
    console.log(this.filterForm.value)
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brandsLoaded = true;
    })
  }

  getColours(){
    this.colourService.getColours().subscribe((response) => {
      this.colours = response.data;
      this.coloursLoaded = true;
    })
  }
}
