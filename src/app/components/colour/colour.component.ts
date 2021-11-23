import { ColourService } from './../../services/colour.service';
import { Colour } from './../../models/colour';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colour',
  templateUrl: './colour.component.html',
  styleUrls: ['./colour.component.css']
})
export class ColourComponent implements OnInit {

  colours:Colour[] = [];
  dataLoaded:boolean = false;
  currentColour:Colour = {id: 0, name: ""};
  constructor(private colourService:ColourService) { }

  ngOnInit(): void {
    this.getColours()
  }

  getColours(){
    this.colourService.getColours().subscribe((response) => {
      this.colours = response.data;
      this.dataLoaded = true;
    })
  }

  setCurrentColour(colour:Colour){
    this.currentColour = colour;
  }

  getCurrentColourClass(colour:Colour){
    if(this.currentColour == colour){
      return "list-group-item active";
    }
    else{
      return "list-group-item"
    }
  }

  setCurrentColourDefault(){
    this.currentColour = {id: 0, name: ""};
  }

  getCurrentBrandAllClass(){
    if(this.currentColour.id == 0){
      return "list-group-item active";
    }
    else{
      return "list-group-item"
    }
  }
}
