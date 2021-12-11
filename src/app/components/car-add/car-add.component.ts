import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../services/car.service';
import { ColourService } from './../../services/colour.service';
import { Colour } from './../../models/colour';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: FormGroup;

  brands: Brand[];
  colours: Colour[];

  constructor(private formBuilder: FormBuilder, private brandService: BrandService, 
    private colourService: ColourService, private carService: CarService, 
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColours();
    this.createCarAddForm();
    this.carAddForm.valueChanges.subscribe(console.log);
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
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

  add(){
    let carModel = Object.assign({}, this.carAddForm.value);
    if (this.carAddForm.valid) {
      this.carService.add(carModel).subscribe((response) => {
        this.toastrService.success(`Car is added successfully`);
      }, (responseError) => {
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
