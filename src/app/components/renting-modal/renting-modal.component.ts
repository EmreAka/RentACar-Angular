import { ActivatedRoute } from '@angular/router';
import { Rental } from './../../models/rental';
import { RentalService } from './../../services/rental.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-renting-modal',
  templateUrl: './renting-modal.component.html',
  styleUrls: ['./renting-modal.component.css']
})
export class RentingModalComponent implements OnInit {

  currentDate:any;
  returnDate:any;
  isCarAvailable:boolean;
  messageToDisplay:string;
  carId:number = 2;

  constructor(private rentalService:RentalService, private activatedRoute:ActivatedRoute,
    private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  checkIfCarIsAvailable(carId:number, rentDate:string, returnDate:string){
    this.rentalService.checkIfCarIsAvailable(carId, rentDate, returnDate).subscribe((response) => {
      this.isCarAvailable = response.success;
      this.messageToDisplay = response.message;
    })
  }

  addRental(currentDate:string, returnDate:string, carId:number){
    let values = returnDate.split("-");
    let returnDataConverted = this.datePipe.transform(new Date(+values[0], +values[1] - 1, +values[2]), 'yyyy-MM-dd');
    let rental = {carId: carId, customerId: 2023, rentDate: currentDate, returnDate: returnDataConverted};
    this.rentalService.addRental(rental).subscribe((response) => {
      console.log(response);
    }
    );
  }
}
