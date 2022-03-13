import {CarService} from './../../services/car.service';
import {Car} from './../../models/car';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
    ]),
    trigger('fav', [
      state('open', style({color: "gray"})),
      state('closed', style({})),
      transition('open => closed', [
        animate(200)
      ]),
      transition('closed => open', [
        animate(200)
      ])
    ])
  ]
})
export class CarComponent implements OnInit {

  currentCars: Car[] = [];
  dataLoaded: boolean = false;
  filterText: string = "";
  isFav: boolean = false;

  favoritedCar: any = 0;

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

  setFav(i: any){
    /*if (this.isFav == false) this.isFav = true;
    else this.isFav = false;*/
    this.favoritedCar = i;
  }

  getFavClass(i: any){
    /*if (!this.isFav) return "bi bi-heart";
    else return "bi bi-heart-fill";*/
    if (this.favoritedCar != i) return "bi bi-heart";
    else return "bi bi-heart-fill";
  }

  triggerAni(i: any){
    if (this.favoritedCar != i) return 'closed';
    else return 'open';
  }

}
