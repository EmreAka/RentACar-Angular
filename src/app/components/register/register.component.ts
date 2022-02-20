import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from './../../models/registerModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
    private authService: AuthService) { }

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
    let registerModel: RegisterModel = Object.assign({}, this.registerForm.value);
    if (this.registerForm.valid) {
      this.authService.register(registerModel).subscribe((response) => {
        localStorage.setItem('token', response.data.token);
        this.toastrService.success(response.message);
      }, (responseError) => {
        this.toastrService.error(responseError.error);
      });
    }
    else {
      this.toastrService.error("Complete the form!");
    }
  }

}
