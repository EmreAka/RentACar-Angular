import { BrandService } from './../../services/brand.service';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[] = [];
  dataLoaded:boolean = false;
  currentBrand:Brand = {id: 0, name: ""};
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand == brand){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  setCurrentBrandDefault(){
    this.currentBrand = {id: 0, name: ""};
  }

  getCurrentBrandAllClass(){
    if(this.currentBrand.id == 0){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }
}
