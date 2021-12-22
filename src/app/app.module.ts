import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColourComponent } from './components/colour/colour.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColourListComponent } from './components/colour-list/colour-list.component';
import { ColourFilterPipe } from './pipes/colour-filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { RentingModalComponent } from './components/renting-modal/renting-modal.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColourAddComponent } from './components/colour-add/colour-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { ColourEditComponent } from './components/colour-edit/colour-edit.component';
import { BrandEditComponent } from './components/brand-edit/brand-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CardNumberPipe } from './pipes/card-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColourComponent,
    CustomerComponent,
    RentalComponent,
    CarComponent,
    CarDetailComponent,
    CarFilterPipe,
    BrandListComponent,
    BrandFilterPipe,
    ColourListComponent,
    ColourFilterPipe,
    CarFilterComponent,
    RentingModalComponent,
    BrandAddComponent,
    ColourAddComponent,
    CarAddComponent,
    CarEditComponent,
    ColourEditComponent,
    BrandEditComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CardNumberPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
