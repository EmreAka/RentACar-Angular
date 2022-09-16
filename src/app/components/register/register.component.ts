import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators, ValidationErrors } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private toastrService: ToastrService,
    private authService: AuthService, private spinner: NgxSpinnerService, private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Rent A Car - Register")
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(9)]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      companyName: [""]
    });
  }

  getFormValidationErrors() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const controlErrors: ValidationErrors | null = this.registerForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          this.toastrService.error('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  register() {
    this.spinner.show("s1");
    let registerModel: RegisterModel = Object.assign({}, this.registerForm.value);
    if (this.registerForm.valid) {
      this.authService.register(registerModel).subscribe({
        next: (value) => {
          this.spinner.hide("s1");
          localStorage.setItem('token', value.data.token);
          this.authService.getUserDetailsFromToken();
          this.router.navigate([""]);
          this.toastrService.success(value.message);
        },
        error: (err) => {
          this.spinner.hide("s1");
          this.toastrService.error(err.error);
        }
      });
    }
    else {
      this.spinner.hide("s1");
      this.getFormValidationErrors();
    }
  }

  // register() {
  //   this.spinner.show("s1");
  //   let registerModel: RegisterModel = Object.assign({}, this.registerForm.value);
  //   if (this.registerForm.valid) {
  //     this.authService.register(registerModel).subscribe((response) => {
  //       this.spinner.hide("s1");
  //       localStorage.setItem('token', response.data.token);
  //       this.authService.getUserDetailsFromToken();
  //       this.router.navigate([""]);
  //       this.toastrService.success(response.message);
  //     }, (responseError) => {
  //       this.spinner.hide("s1");
  //       this.toastrService.error(responseError.error);
  //     });
  //   }
  //   else {
  //     this.spinner.hide("s1");
  //     this.toastrService.error("Complete the form!");
  //   }
  // }

}
