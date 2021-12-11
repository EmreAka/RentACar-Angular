import { Router } from '@angular/router';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands:Brand[] = [];
  dataLoaded:boolean = false;
  filterText:string = "";

  constructor(private brandService:BrandService, private router: Router) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentRouteToBrandAdd(){
    this.router.navigateByUrl("brands/add");
  }

  setCurrentRouteToBrandEdit(brandId: number){
    this.router.navigateByUrl("brands/edit/" + brandId);
  }
}
