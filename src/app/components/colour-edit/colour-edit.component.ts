import { ActivatedRoute } from '@angular/router';
import { Colour } from './../../models/colour';
import { ToastrService } from 'ngx-toastr';
import { ColourService } from './../../services/colour.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-colour-edit',
  templateUrl: './colour-edit.component.html',
  styleUrls: ['./colour-edit.component.css']
})
export class ColourEditComponent implements OnInit {

  colourUpdateForm: FormGroup;

  colour: Colour = {id: 0, name: ""};

  constructor(private formBuilder: FormBuilder, private colourService: ColourService, 
    private toastrService: ToastrService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getColorById(params['colourId']);
    });
    this.createColourAddForm();
  }

  createColourAddForm(){
    this.colourUpdateForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  getColorById(colourId: number){
    this.colourService.getColourById(colourId).subscribe((response) => {
      this.colour = response.data;
      this.colourUpdateForm.controls['name'].setValue(this.colour.name);
    })
  }

  update(){
    let colourModel: Colour = Object.assign({id: this.colour.id}, this.colourUpdateForm.value);
    if (this.colourUpdateForm.valid) {
      this.colourService.update(colourModel).subscribe((response) => {
        this.toastrService.success("Colour is successfully updated.");
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
