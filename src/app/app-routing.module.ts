import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", component: CarComponent},
  {path: "cars", component: CarComponent},
  {path: "cars/brand/:brandId", component: CarComponent},
  {path: "cars/colour/:colourId", component: CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
