import {ActivatedRoute} from '@angular/router';
import {CarService} from './../../services/car.service';
import {Car} from './../../models/car';
import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *, * => void', [
        animate(1000)
      ])
    ])
  ]
})
export class CarDetailComponent implements OnInit {

  car: Car = {
    id: 0, brandName: "", colourName: "", companyName: "", engineType: "", fuelType: "", doorNumber: 0,
    fuelConsumption: 0, dailyPrice: 0, description: "", images: [], modelYear: 0
  };

  currentImgSrc: string = "";
  indexOfCurrentImage = 0;
  sizeOfImages: number = 0;

  dataLoaded: boolean = false;

  constructor(private title:Title, private carService: CarService, private activatedRoute: ActivatedRoute, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params["carId"]);
    })
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
      this.title.setTitle(`${this.car.brandName}`)
      this.currentImgSrc = this.car.images[0];
      this.sizeOfImages = this.car.images.length;
      this.dataLoaded = true;
    })
  }

  getCurrentImage() {
    return this.currentImgSrc;
  }

  setNextCurrentImage() {
    if (this.indexOfCurrentImage >= (this.sizeOfImages - 1)){
      this.indexOfCurrentImage = 0;
      this.currentImgSrc = this.car.images[this.indexOfCurrentImage];
    } else {
      this.indexOfCurrentImage += 1;
      this.currentImgSrc = this.car.images[this.indexOfCurrentImage];
    }
  }

  setBackCurrentImage() {
    if (this.indexOfCurrentImage == 0) {
      this.indexOfCurrentImage = this.sizeOfImages - 1;
      this.currentImgSrc = this.car.images[this.sizeOfImages - 1]
    } else {
      this.indexOfCurrentImage -= 1;
      this.currentImgSrc = this.car.images[this.indexOfCurrentImage];
    }
  }
}
