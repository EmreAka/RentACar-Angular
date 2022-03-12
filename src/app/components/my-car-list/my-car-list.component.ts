import { Component, OnInit } from '@angular/core';
import {Car} from "../../models/car";
import {CarService} from "../../services/car.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-my-car-list',
  templateUrl: './my-car-list.component.html',
  styleUrls: ['./my-car-list.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void => *', [
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000)
      ])
    ])
  ]
})
export class MyCarListComponent implements OnInit {

  cars: Car[] = [];
  dataLoaded: boolean = false;

  constructor(private carService: CarService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getCarDetailsByCustomerId();
  }

  getCarDetailsByCustomerId(){
    this.carService.getCarDetailsByCustomerId(this.authService.decodedToken["UserId"]).subscribe(response => {
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentRouteToCarDetail(carId:number){
    this.router.navigateByUrl("cars/detail/" + carId);
  }

  setCurrentRouteToCarEdit(carId:number){
    this.router.navigateByUrl("cars/edit/" + carId);
  }

}
