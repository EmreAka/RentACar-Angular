import {ActivatedRoute} from '@angular/router';
import {CarImageService} from './../../services/car-image.service';
import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-car-image-upload',
  templateUrl: './car-image-upload.component.html',
  styleUrls: ['./car-image-upload.component.css']
})
export class CarImageUploadComponent implements OnInit {

  loading: Boolean = false;
  file: File;
  carId: string;

  constructor(private carImageService: CarImageService, private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params["carId"];
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    this.carImageService.upload(this.file, this.carId).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        this.loading = false;
      }
    }, (responseError) => {
      if (responseError.error.Errors) {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i]);
          }
          this.loading = false;
        }
      } else {
        this.toastrService.error(responseError.error.Message);
        this.loading = false;
      }
    });
  }
}
