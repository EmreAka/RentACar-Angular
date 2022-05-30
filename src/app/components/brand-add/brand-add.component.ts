import { BrandService } from './../../services/brand.service';
import { Brand } from './../../models/brand';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
    private brandService: BrandService, private router: Router) { }

  ngOnInit(): void {
    this.createBrandAddFrom();
  }

  createBrandAddFrom() {
    this.brandAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    });
  }

  add() {
    let brandModel: Brand = Object.assign({}, this.brandAddForm.value);
    if (this.brandAddForm.valid) {
      this.brandService.add(brandModel).subscribe((response) => {
        this.toastrService.success(`${brandModel.name} is added successfully.`);
        this.router.navigate(["brands"]);
      },(responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i]);
          }
        }
      })
    }else {
      this.toastrService.error("Complete the form!")
    }
  }

}
