import { Router } from '@angular/router';
import { ColourService } from './../../services/colour.service';
import { BrandService } from './../../services/brand.service';
import { Colour } from './../../models/colour';
import { Brand } from './../../models/brand';
import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {CarService} from "../../services/car.service";
import {Car} from "../../models/car";

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  cars: Car[] = [];
  brands:Brand[] = [];
  colours:Colour[] = [];
  brandsLoaded:boolean = false;
  coloursLoaded:boolean = false;

  brandId:number;
  colourId:number;

  currentBrand:Brand = {id: 0, name: ""};
  currentColour:Colour = {id: 0, name: ""};
  dataLoaded: boolean = false;

  brandFilterText: string = "";
  colourFilterText: string = "";

  @Output() currentCarsEvent = new EventEmitter<Car[]>();
  @Output() dataLoadedEvent = new EventEmitter<boolean>();

  constructor(private brandService:BrandService, private colourService:ColourService, private router:Router,
              private carService: CarService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColours();
    this.getCars();
  }

  sendCurrentCars(){
    this.currentCarsEvent.emit(this.cars);
    this.dataLoadedEvent.emit(this.dataLoaded);
  }

  filterCars(){
    if (this.currentBrand.id != 0 && this.currentColour.id == 0){
      this.getCarsByBrandId(this.currentBrand.id);
    } else if (this.currentBrand.id == 0 && this.currentColour.id != 0){
      this.getCarsByColourId(this.currentColour.id);
    } else if (this.currentBrand.id != 0 && this.currentColour.id != 0){
      this.getCarsByBrandIdAndColourId(this.currentBrand.id, this.currentColour.id);
    } else{
      this.getCars();
    }
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.sendCurrentCars();
    })
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.sendCurrentCars();
    })
  }

  getCarsByColourId(colourId: number) {
    this.carService.getCarsByColourId(colourId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.sendCurrentCars();
    })
  }

  getCarsByBrandIdAndColourId(brandId: number, colourId: number) {
    this.carService.getCarsByBrandIdAndColourId(brandId, colourId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
      this.sendCurrentCars();
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.brandsLoaded = true;
    })
  }

  getColours(){
    this.colourService.getColours().subscribe((response) => {
      this.colours = response.data;
      this.coloursLoaded = true;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    this.filterCars();
  }

  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand == brand){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  setCurrentBrandDefault(){
    this.currentBrand = {id: 0, name: ""};
    this.filterCars();
  }

  getCurrentBrandAllClass(){
    if(this.currentBrand.id == 0){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  //Colour
  setCurrentColour(colour:Colour){
    this.currentColour = colour;
    this.filterCars();
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
    this.filterCars();
  }

  getCurrentColourAllClass(){
    if(this.currentColour.id == 0){
      return "list-group-item active";
    }
    else{
      return "list-group-item"
    }
  }
}
