import { ActivatedRoute } from '@angular/router';
import { Brand } from './../../models/brand';
import { BrandService } from './../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  brandUpdateForm: FormGroup;

  brand: Brand = {id: 0, name: ""};

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
    private brandService: BrandService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrandById(params['brandId']);
    });
    this.createBrandUpdateFrom();
  }

  createBrandUpdateFrom() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  getBrandById(brandId: number){
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.brandUpdateForm.controls['name'].setValue(this.brand.name);
    });
  }

  update() {
    let brandModel: Brand = Object.assign({id: this.brand.id}, this.brandUpdateForm.value);
    if (this.brandUpdateForm.valid) {
      this.brandService.update(brandModel).subscribe((response) => {
        this.toastrService.success("Brand is successfully updated.");
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
