import { Component, OnInit } from '@angular/core';
import {Car} from "../../models/car";
import {CarService} from "../../services/car.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-car-list',
  templateUrl: './my-car-list.component.html',
  styleUrls: ['./my-car-list.component.css']
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
