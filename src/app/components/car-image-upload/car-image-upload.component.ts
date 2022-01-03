import { ActivatedRoute } from '@angular/router';
import { CarImageService } from './../../services/car-image.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-image-upload',
  templateUrl: './car-image-upload.component.html',
  styleUrls: ['./car-image-upload.component.css']
})
export class CarImageUploadComponent implements OnInit {

  loading: Boolean = false;
  file: File;
  carId: string;

  constructor(private carImageService: CarImageService, private activatedRoute: ActivatedRoute) { }

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
    console.log(this.file);
    this.carImageService.upload(this.file, this.carId).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        this.loading = false;
      }
    });
  }

}