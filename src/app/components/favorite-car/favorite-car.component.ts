import { Component, OnInit } from '@angular/core';
import { FavoriteService } from "../../services/favorite.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorite-car',
  templateUrl: './favorite-car.component.html',
  styleUrls: ['./favorite-car.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000)
      ])
    ])
  ]
})
export class FavoriteCarComponent implements OnInit {

  favoriteCars: any[] = [];
  dataLoaded: boolean = false;

  constructor(private favoriteCarService: FavoriteService, private authService: AuthService,
    private router: Router, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getFavoriteDetailsByUserId();
  }

  getFavoriteDetailsByUserId() {
    this.favoriteCarService.getFavoriteDetailsByUserId()
      .subscribe((response) => {
        this.favoriteCars = response.data;
        this.dataLoaded = true;
      });
  }

  removeFavorite(favorite: any) {
    this.favoriteCarService.deleteFavorite(favorite).subscribe(
      {
        next: () => {
            this.toastrService.success(`Car is deleted from Favorites successfully`);
            const indeks = this.favoriteCars.findIndex(x => x.id == favorite.id);
            this.favoriteCars.splice(indeks, 1);
          }
      });
  }

  setCurrentRouteToCarDetail(carId: number) {
    this.router.navigateByUrl("cars/detail/" + carId);
  }

}
