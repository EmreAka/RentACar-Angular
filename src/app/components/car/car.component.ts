import {CarService} from './../../services/car.service';
import {Car} from './../../models/car';
import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Brand} from "../../models/brand";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({opacity: 0})),
      transition('void <=> *', [
        animate(1000)
      ])
    ])
  ]
})
export class CarComponent implements OnInit {

  currentCars: Car[] = [];
  dataLoaded: boolean = false;
  filterText: string = "";

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  receiveCurrentCars($event: Car[]){
    this.currentCars = $event;
  }

  receiveDataLoaded($event: boolean){
    this.dataLoaded = $event;
  }

  setCurrentRouteToCarDetail(carId: number) {
    this.router.navigateByUrl("cars/detail/" + carId);
  }

  setCurrentRouteToCarAdd() {
    this.router.navigateByUrl("cars/add");
  }

  setCurrentRouteToCarEdit(carId: number) {
    this.router.navigateByUrl("cars/edit/" + carId);
  }

}
