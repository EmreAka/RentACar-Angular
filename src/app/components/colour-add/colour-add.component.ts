import { ToastrService } from 'ngx-toastr';
import { ColourService } from './../../services/colour.service';
import { Colour } from './../../models/colour';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-colour-add',
  templateUrl: './colour-add.component.html',
  styleUrls: ['./colour-add.component.css']
})
export class ColourAddComponent implements OnInit {

  colourAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private colourService: ColourService,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.createColourAddForm();
    this.colourAddForm.valueChanges.subscribe(console.log);
  }

  createColourAddForm(){
    this.colourAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  add(){
    let colourModel: Colour = Object.assign({}, this.colourAddForm.value);
    if (this.colourAddForm.valid) {
      this.colourService.add(colourModel).subscribe((response) => {
        this.toastrService.success(`${colourModel.name} is added successfully.`);
        this.router.navigate(["colours"]);
    }, (responseError) => {
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i]);
        }
      }
    })
    }
    else {
      this.toastrService.error("Complete the form!");
    }
  }

}
