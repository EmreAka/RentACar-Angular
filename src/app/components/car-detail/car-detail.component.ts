import { ActivatedRoute } from '@angular/router';
import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  car:Car = {id: 0, brandName: "", colourName: "", dailyPrice: 0, description: "", images: [], modelYear: 0};
  dataLoaded:boolean = false;
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params["carId"]);
    })
  }

  getCarDetailByCarId(carId:number){
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
      this.dataLoaded = true;
    })
  }

}
