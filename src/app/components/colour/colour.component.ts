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
}
