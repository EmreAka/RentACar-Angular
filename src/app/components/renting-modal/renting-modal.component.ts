import {LocalStorageService} from './../../services/local-storage.service';
import {CardService} from './../../services/card.service';
import {PaymentService} from './../../services/payment.service';
import {CardToPay} from './../../models/cardToPay';
import {ActivatedRoute} from '@angular/router';
import {Rental} from './../../models/rental';
import {RentalWithCard} from "../../models/rentalWithCard";
import {RentalService} from './../../services/rental.service';
import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Card} from 'src/app/models/card';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-renting-modal',
  templateUrl: './renting-modal.component.html',
  styleUrls: ['./renting-modal.component.css']
})
export class RentingModalComponent implements OnInit {

  currentDate: any;
  returnDate: any;
  isCarAvailable: boolean;
  messageToDisplay: string;
  carId: number;
  isSaveCardChecked: boolean;
  cards: Card[];
  hasSavedCard: boolean = false;
  cardFromDropdown: Card;

  paymentForm: FormGroup;
  months: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  years: string[] = ["2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033"];

  constructor(private rentalService: RentalService, private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe, private formBuilder: FormBuilder, private paymentService: PaymentService,
              private toastrService: ToastrService, private cardService: CardService,
              private localStorageservice: LocalStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (this.authService.isAuthenticated()){
      this.authService.getUserDetailsFromToken();
    }

    this.activatedRoute.params.subscribe((params) => {
      this.carId = params["carId"];
    })

    this.createPaymentForm()

    this.paymentForm.valueChanges.subscribe(console.log);

    if (this.authService.isAuthenticated()){
      this.getCards();
    }
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ["", Validators.required],
      nameOnCard: ["", Validators.required],
      cvv: ["", Validators.required],
      expirationMonth: ["01", Validators.required],
      expirationYear: ["2022", Validators.required]
    });
  }

  checkIfCarIsAvailable(carId: number, rentDate: string, returnDate: string) {
    this.rentalService.checkIfCarIsAvailable(carId, rentDate, returnDate).subscribe((response) => {
      this.isCarAvailable = response.success;
      this.messageToDisplay = response.message;
      if (response.success) {
        this.toastrService.success(response.message);
        if (!this.authService.isAuthenticated()){
          this.toastrService.info("To continue, please log in.");
        }
      } else {
        this.toastrService.error(response.message);
      }
    })
  }

  getCurrentClassOfPayButton() {
    if (this.isCarAvailable && this.authService.isAuthenticated()) {
      return "btn btn-primary";
    } else {
      return "btn btn-primary disabled";
    }
  }

  addRental() {
    //--CARD--
    let card: CardToPay;
    card = {
      nameOnCard: this.paymentForm.value.nameOnCard,
      cardNumber: this.paymentForm.value.cardNumber,
      cvv: this.paymentForm.value.cvv,
      expirationMonth: this.paymentForm.value.expirationMonth,
      expirationYear: this.paymentForm.value.expirationYear
    };

    //--RENTAL--
    let values = this.returnDate.split("-");
    let returnDataConverted: string | null= this.datePipe.transform(new Date(+values[0], +values[1] - 1, +values[2]), 'yyyy-MM-dd');
    let rental: RentalWithCard = {rental: {carId: this.carId, customerId: this.authService.decodedToken["UserId"], rentDate: this.currentDate, returnDate: returnDataConverted},
    card: {...card}};
    this.rentalService.addRental(rental).subscribe((response) => {
      if (response.success) {
        this.toastrService.success("The rent has been successfully completed.");
      } else {
        this.toastrService.error("An error occured! Try later.");
      }
    }, (errorResponse) => {
      this.toastrService.error(errorResponse.error.message);
    });
  }

  //user id is temporarily set to 1 manually.
  addCard() {
    let card = {
      cardNumber: this.paymentForm.value.cardNumber, cvv: this.paymentForm.value.cvv,
      expiration: this.paymentForm.value.expirationYear + "-" + this.paymentForm.value.expirationMonth + "-" + "01",
      nameOnCard: this.paymentForm.value.nameOnCard, userId: this.authService.decodedToken['UserId']
    };

    let cardToAdd = Object.assign({id: 0}, card);
    console.log(card.expiration);
    this.cardService.addCard(cardToAdd).subscribe((response) => {
      if (response.success) {
        this.toastrService.success("Card saved successfully.");
      } else if (response.success == false) {
        this.toastrService.error("An error occured when saving the card. Try later.")
      }
    })
  }

  pay(){
    if (this.paymentForm.valid){
      this.addRental()
      if (this.isSaveCardChecked){
        this.addCard()
      }
    }
  }

  getCards() {
    this.cardService.getCardsByUserId().subscribe((response) => {
      this.cards = response.data;
      if (this.cards.length > 0) {
        this.hasSavedCard = true;
      } else {
        this.hasSavedCard = false;
      }
    });
  }

  setHasSavedCardFalse() {
    this.hasSavedCard = false;
  }

}
