import { LoginModel } from './../../models/loginModel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  login() {
    let loginModel: LoginModel = Object.assign({}, this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(loginModel).subscribe((response) => {
        this.toastrService.info(response.message);
        localStorage.setItem('token', response.data.token);
      }, (responseError) => {
        this.toastrService.error(responseError.error);
      })
    } else {
      console.log("hata!");
    }
  }
}
