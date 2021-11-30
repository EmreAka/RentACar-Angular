import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  dataLoaded:boolean = false;
  filterText:string = "";

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["brandId"] && !params["colourId"]){
        this.getCarsByBrandId(params["brandId"]);
      }
      else if(params["colourId"] && !params["brandId"]){
        this.getCarsByColourId(params["colourId"]);
      }
      else if(params["brandId"] && params["colourId"]){
        this.getCarsByBrandIdAndColourId(params["brandId"], params["colourId"]);
      }
      else{
        this.getCars();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByColourId(colourId:number){
    this.carService.getCarsByColourId(colourId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  getCarsByBrandIdAndColourId(brandId:number, colourId:number){
    this.carService.getCarsByBrandIdAndColourId(brandId, colourId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentRoute(carId:number){
    this.router.navigateByUrl("cars/detail/" + carId);
  }

}
