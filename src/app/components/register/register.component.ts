import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder, private toastrService: ToastrService,
    private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      companyName: ["", Validators.required]
    });
  }

  register(){
    this.spinner.show("s1");
    let registerModel: RegisterModel = Object.assign({}, this.registerForm.value);
    if (this.registerForm.valid) {
      this.authService.register(registerModel).subscribe((response) => {
        this.spinner.hide("s1");
        localStorage.setItem('token', response.data.token);
        this.toastrService.success(response.message);
      }, (responseError) => {
        this.spinner.hide("s1");
        this.toastrService.error(responseError.error);
      });
    }
    else {
      this.spinner.hide("s1");
      this.toastrService.error("Complete the form!");
    }
  }

}
