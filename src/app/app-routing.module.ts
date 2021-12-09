import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColourListComponent } from './components/colour-list/colour-list.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColourComponent } from './components/colour/colour.component';

const routes: Routes = [
  {path: "", pathMatch: "full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/brand/:brandId", component: CarComponent},
  {path: "cars/colour/:colourId", component: CarComponent},
  {path: "cars/brand/:brandId/colour/:colourId", component: CarComponent},
  {path: "cars/detail/:carId", component: CarDetailComponent},
  {path: "colours", component: ColourListComponent},
  {path: "brands", component: BrandListComponent},
  {path: "brands/add", component: BrandAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
