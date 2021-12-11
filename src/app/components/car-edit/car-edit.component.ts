import { PlainCar } from './../../models/plainCar';
import { ActivatedRoute } from '@angular/router';
import { Car } from './../../models/car';
import { ToastrService } from 'ngx-toastr';
import { ColourService } from './../../services/colour.service';
import { CarService } from './../../services/car.service';
import { BrandService } from './../../services/brand.service';
import { Colour } from './../../models/colour';
import { Brand } from './../../models/brand';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  carUpdateForm: FormGroup;

  brands: Brand[];
  colours: Colour[];
  car: PlainCar = {brandId: 0, colourId: 0, dailyPrice: 0, description: "", id: 0, modelYear: 0};

  constructor(private formBuilder: FormBuilder, private brandService: BrandService, 
    private colourService: ColourService, private carService: CarService, 
    private toastrService: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarById(params["carId"]);
    })
    this.getBrands();
    this.getColours();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colourId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColours(){
    this.colourService.getColours().subscribe((response) => {
      this.colours = response.data;
    });
  }

  getCarById(carId: number){
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.carUpdateForm.controls['brandId'].setValue(this.car.brandId);
      this.carUpdateForm.controls['colourId'].setValue(this.car.colourId);
      this.carUpdateForm.controls['modelYear'].setValue(this.car.modelYear);
      this.carUpdateForm.controls['dailyPrice'].setValue(this.car.dailyPrice);
      this.carUpdateForm.controls['description'].setValue(this.car.description);
    });
  }

  update(){
    let carModel: PlainCar = Object.assign({id: this.car.id}, this.carUpdateForm.value);
    if (this.carUpdateForm.valid) {
      this.carService.update(carModel).subscribe((response) => {
        this.toastrService.success("Car is updated successfully.");
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i]);
          }
        }
      });
    } else {
      this.toastrService.error("Complete the form!");
    }
  }
}