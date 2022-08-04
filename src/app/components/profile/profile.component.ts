import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from './../../models/customer';
import { CustomerService } from './../../services/customer.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: UntypedFormGroup
  user: Customer = { id: 0, companyName: "", email: "", firstName: "", lastName: "", status: true };

  constructor(private formBuilder: UntypedFormBuilder, private spinner: NgxSpinnerService,
    private customerService: CustomerService, private toastrService: ToastrService,) { }

  ngOnInit(): void {
    this.spinner.show("s1");
    this.getCustomerDetailByEmail();
    this.createProfileForm();
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      companyName: ["", Validators.required],
      status: [true, Validators.required]
    });
  }

  checkIfValuesChanged() {
    if (this.profileForm.value.firstName === this.user.firstName
      && this.profileForm.value.lastName === this.user.lastName
      && this.profileForm.value.email === this.user.email
      && this.profileForm.value.companyName === this.user.companyName) {
      return false;
    }
    return true;
  }

  getCurrentClassOfButton() {
    if (this.checkIfValuesChanged()) {
      return "btn btn-dark float-end";
    }
    return "btn btn-dark float-end disabled"
  }

  updateCustomerDetails() {
    let updateModel: Customer = Object.assign({}, this.profileForm.value);
    this.customerService.updateCustomerDetails(updateModel).subscribe((response) => {
      this.toastrService.success(response.message);
      this.getCustomerDetailByEmail();
    }, (responseError) => {
      this.toastrService.error("An error occured. Try later.");
    });
  }

  getCustomerDetailByEmail() {
    this.customerService.getCustomerByEmail().subscribe((response) => {
      this.user = response.data[0];
      this.profileForm.controls['firstName'].setValue(this.user.firstName);
      this.profileForm.controls['lastName'].setValue(this.user.lastName);
      this.profileForm.controls['email'].setValue(this.user.email);
      this.profileForm.controls['companyName'].setValue(this.user.companyName);
      this.spinner.hide("s1");
    }, (responseError) => {
      this.toastrService.error("An error occured!");
    });
  }

}
