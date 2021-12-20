import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup
  user: any;

  constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.getUserInformation();
    this.createProfileForm();
  }

  createProfileForm(){
    this.profileForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      companyName: [this.user.companyName, Validators.required],
    });
  }

  getUserInformation(){
    this.user = this.localStorageService.get('user');
    this.user = JSON.parse(this.user);
  }

  checkIfValuesChanged(){
    if (this.profileForm.value.firstName === this.user.firstName 
      && this.profileForm.value.lastName === this.user.lastName
      && this.profileForm.value.email === this.user.email 
      && this.profileForm.value.companyName === this.user.companyName) {
      return false;
    }
    return true;
  }

  getCurrentClassOfButton(){
    if (this.checkIfValuesChanged()) {
      return "btn btn-dark float-end";
    }
    return "btn btn-dark float-end disabled"
  }

}
