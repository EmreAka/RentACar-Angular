import {Rental} from './../../models/rental';
import {RentalService} from './../../services/rental.service';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  filterText: string = "";
  rentals: Rental[] = [];
  dataLoaded: boolean = false;

  constructor(private rentalService: RentalService, private toast: ToastrService, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getRentalsByUserId();
  }

  getRentalsByUserId() {
    this.rentalService.getRentalsByUserId(this.auth.decodedToken["UserId"]).subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    })
  }

  delete(rental: any) {
    this.rentalService.delete(rental).subscribe(response => {
      this.toast.success(response.message);
      this.rentals.splice(this.rentals.findIndex(r => r.id == rental.id), 1);
      this.router.navigate(["rentals"]);
    });
  }
}
