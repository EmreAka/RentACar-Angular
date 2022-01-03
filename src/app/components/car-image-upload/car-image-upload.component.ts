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

  constructor(private carImageService: CarImageService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.carImageService.upload(this.file).subscribe((event: any) => {
      if (typeof (event) === 'object') {
        this.loading = false;
      }
    });
  }

}
