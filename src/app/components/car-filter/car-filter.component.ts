import { Router } from '@angular/router';
import { ColourService } from './../../services/colour.service';
import { BrandService } from './../../services/brand.service';
import { Colour } from './../../models/colour';
import { Brand } from './../../models/brand';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  brandId:number;
  colourId:number;

  constructor(private brandService:BrandService, private colourService:ColourService, private router:Router) { }

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

  setCurrentRoute(){
    if (this.brandId && !this.colourId){
      this.router.navigateByUrl("cars/brand/" + this.brandId);
    }else if(!this.brandId && this.colourId){
      this.router.navigateByUrl("cars/colour/" + this.colourId);
    }else {
      this.router.navigateByUrl("cars/brand/" + this.brandId + "/colour/" + this.colourId);
    }
  }
}
