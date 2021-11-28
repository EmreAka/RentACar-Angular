import { ColourService } from './../../services/colour.service';
import { Colour } from './../../models/colour';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colour-list',
  templateUrl: './colour-list.component.html',
  styleUrls: ['./colour-list.component.css']
})
export class ColourListComponent implements OnInit {

  dataLoaded:boolean = false;
  filterText:string = "";
  colours:Colour[] = [];

  constructor(private colourService:ColourService) { }

  ngOnInit(): void {
    this.getColours();
  }

  getColours(){
    this.colourService.getColours().subscribe(response => {
      this.colours = response.data;
      this.dataLoaded = true;
    })
  }

}
