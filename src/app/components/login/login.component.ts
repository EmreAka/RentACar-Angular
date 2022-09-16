import { CustomerService } from './../../services/customer.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { LoginModel } from './../../models/loginModel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthService,
    private toastrService: ToastrService, private localStorageService: LocalStorageService,
    private customerService: CustomerService, private router: Router, private spinner: NgxSpinnerService,
    private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle("Rent A Car - Login")
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  // login() {
  //   this.spinner.show("s1");
  //   let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
  //   if (this.loginForm.valid) {
  //     this.authService.login(loginModel).subscribe((response) => {
  //       this.spinner.hide("s1");
  //       this.toastrService.info(response.message);
  //       this.localStorageService.add('token', response.data.token);
  //       this.authService.getUserDetailsFromToken();
  //       this.router.navigate([""]);
  //     }, (responseError) => {
  //       this.spinner.hide("s1")
  //       this.toastrService.error(responseError.error);
  //     })
  //   }
  // }

  login() {
    this.spinner.show("s1");
    let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(loginModel).subscribe({
        next: (value) => {
          this.spinner.hide("s1")
          this.toastrService.info(value.message);
          this.localStorageService.add('token', value.data.token);
          this.authService.getUserDetailsFromToken();
          this.router.navigate([""]);
        },
        error: (error) => {
          this.spinner.hide("s1")
          this.toastrService.error(error.error);
        }
      });
    }
    else {
      this.spinner.hide("s1")
      if (this.loginForm.get('email')?.hasError('email')) {
        this.toastrService.error("That's not an email");
      }
      else if (this.loginForm.get('password')?.hasError('minLength')) {
        this.toastrService.error("Password length should be at least 9 characters");
      }
      else {
        this.toastrService.error("Complete the form!");
      }
    }
  }
}
