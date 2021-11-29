import { ColourService } from './../../services/colour.service';
import { BrandService } from './../../services/brand.service';
import { Colour } from './../../models/colour';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';

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

  constructor(private brandService:BrandService, private colourService:ColourService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColours();
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
