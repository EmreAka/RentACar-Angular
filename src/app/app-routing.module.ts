import { CarImageUploadComponent } from './components/car-image-upload/car-image-upload.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { ColourEditComponent } from './components/colour-edit/colour-edit.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColourAddComponent } from './components/colour-add/colour-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColourListComponent } from './components/colour-list/colour-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColourComponent } from './components/colour/colour.component';
import {RentalComponent} from "./components/rental/rental.component";
import {MyCarListComponent} from "./components/my-car-list/my-car-list.component";
import {FavoriteCarComponent} from "./components/favorite-car/favorite-car.component";

const routes: Routes = [
  {path: "", pathMatch: "full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/add", component: CarAddComponent, canActivate: [LoginGuard]},
  {path: "cars/edit/:carId", component: CarEditComponent},
  {path: "cars/detail/:carId", component: CarDetailComponent},
  {path: "colours", component: ColourListComponent},
  {path: "brands", component: BrandListComponent},
  {path: "brands/add", component: BrandAddComponent},
  {path: "brands/edit/:brandId", component: BrandEditComponent},
  {path: "colours/add", component: ColourAddComponent},
  {path: "colours/edit/:colourId", component: ColourEditComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "profile", component: ProfileComponent, canActivate: [LoginGuard]},
  {path: "upload/:carId", component: CarImageUploadComponent},
  {path: "rentals", component: RentalComponent, canActivate: [LoginGuard]},
  {path: "mycars", component: MyCarListComponent, canActivate: [LoginGuard]},
  {path: "favoritecars", component: FavoriteCarComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
