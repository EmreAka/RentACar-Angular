import { CarService } from './../../services/car.service';
import { Car } from './../../models/car';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { AuthService } from "../../services/auth.service";
import { FavoriteService } from "../../services/favorite.service";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "../../services/local-storage.service";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [
        animate(1000)
      ])
    ]),
    trigger('fav', [
      state('open', style({ color: "gray" })),
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
  favorites: any[] = [];
  dataLoaded: boolean = false;
  filterText: string = "";
  isFav: boolean = false;

  favoritedCar: number;

  mouseIsOverOn: number = -1;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute, private router: Router,
    private authService: AuthService, private favService: FavoriteService, private toastrService: ToastrService,
    private localStorageService: LocalStorageService, private title: Title, private meta: Meta) {
  }

  ngOnInit(): void {
    this.title.setTitle("Rent A Car - Cars")
    this.meta.addTags([{ name: "description", content: "Rent A Car - Cars" },
      {name: "keywords", content: "Car, Rental, Rent A Car"}
    ], true);
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpired()) {
      this.getFavoritesByUserId();
    }
  }

  getFavoritesByUserId() {
    this.favService.getFavoritesByUserId().subscribe((response) => {
      this.favorites = response.data;
    })
  }

  deleteFavorite(favorite: any) {
    this.favService.deleteFavorite(favorite).subscribe((response) => {
    })
  }

  receiveCurrentCars($event: Car[]) {
    this.currentCars = $event;
  }

  receiveDataLoaded($event: boolean) {
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

  setFav(carId: number) {
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpired()) {
      let index: number = this.favorites.findIndex(f => f.carId == carId)
      if (index != -1) {
        this.favService.deleteFavorite(this.favorites[index]).subscribe((response) => {
          this.favorites.splice(index, 1);
          this.toastrService.info("Removed from favorites");
        })
      } else {
        this.favService.addFavorite({
          userId: this.authService.decodedToken["UserId"],
          carId: carId
        }).subscribe((response) => {
          this.getFavoritesByUserId()
          this.toastrService.info("Added to favorites");
        })
      }
    } else {
      this.localStorageService.delete('token');
      this.toastrService.info("You need to log in");
    }

  }

  getFavClass(carId: number) {
    if (this.isThatCarFavorited(carId)) return "bi bi-heart-fill";
    else return "bi bi-heart"
  }

  isThatCarFavorited(carId: number): boolean {
    let isFavorited: boolean = false;
    if (this.authService.isAuthenticated()) {
      for (let i = 0; i < this.favorites.length; i++) {
        if (this.favorites[i].carId == carId) {
          isFavorited = true;
        }
      }
    }
    return isFavorited;
  }

  triggerAni(i: any) {
    if (this.favoritedCar != i) return 'closed';
    else return 'open';
  }

  mouseIsOver(i: number) {
    console.log(i);
    this.mouseIsOverOn = i;
  }

  mouseIsNotOver() {
    this.mouseIsOverOn = -1;
  }
}
