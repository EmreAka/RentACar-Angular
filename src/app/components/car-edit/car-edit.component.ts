import {CarImageService} from './../../services/car-image.service';
import {CarImage} from './../../models/carImage';
import {PlainCar} from './../../models/plainCar';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from './../../models/car';
import {ToastrService} from 'ngx-toastr';
import {ColourService} from './../../services/colour.service';
import {CarService} from './../../services/car.service';
import {BrandService} from './../../services/brand.service';
import {Colour} from './../../models/colour';
import {Brand} from './../../models/brand';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Engine} from "../../models/engine";
import {Fuel} from "../../models/fuel";
import {EngineService} from "../../services/engine.service";
import {FuelService} from "../../services/fuel.service";

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {

  carUpdateForm: FormGroup;

  brands: Brand[];
  colours: Colour[];
  engines: Engine[];
  fuels: Fuel[];

  car: PlainCar = {
    brandId: 0,
    colourId: 0,
    fuelId: 0,
    engineId: 0,
    doorNumber: 0,
    fuelConsumption: 0,
    dailyPrice: 0,
    description: "",
    id: 0,
    modelYear: 0,
    userId: 0
  };
  carImages: CarImage[] = [];
  carIdToUploadPhoto: string;

  constructor(private formBuilder: FormBuilder, private brandService: BrandService,
              private colourService: ColourService, private carService: CarService,
              private toastrService: ToastrService, private activatedRoute: ActivatedRoute,
              private carImageService: CarImageService, private router: Router, private engineService: EngineService,
              private fuelService: FuelService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carIdToUploadPhoto = params["carId"];
      this.getCarById(params["carId"]);
      this.getCarImagesByCarId(params["carId"]);
    })
    this.getBrands();
    this.getColours();
    this.getEngines();
    this.getFuels();
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colourId: ["", Validators.required],
      engineId: ["", Validators.required],
      fuelId: ["", Validators.required],
      doorNumber: ["", Validators.required],
      fuelConsumption: ["", Validators.required],
      userId: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required]
    })
  }

  getFuels() {
    this.fuelService.getFuels().subscribe((response) => {
      this.fuels = response.data;
    });
  }

  getEngines() {
    this.engineService.getEngines().subscribe((response) => {
      this.engines = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColours() {
    this.colourService.getColours().subscribe((response) => {
      this.colours = response.data;
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.carUpdateForm.controls['brandId'].setValue(this.car.brandId);
      this.carUpdateForm.controls['colourId'].setValue(this.car.colourId);
      this.carUpdateForm.controls['engineId'].setValue(this.car.engineId);
      this.carUpdateForm.controls['fuelId'].setValue(this.car.fuelId);
      this.carUpdateForm.controls['doorNumber'].setValue(this.car.doorNumber);
      this.carUpdateForm.controls['fuelConsumption'].setValue(this.car.fuelConsumption);
      this.carUpdateForm.controls['userId'].setValue(this.car.userId);
      this.carUpdateForm.controls['modelYear'].setValue(this.car.modelYear);
      this.carUpdateForm.controls['dailyPrice'].setValue(this.car.dailyPrice);
      this.carUpdateForm.controls['description'].setValue(this.car.description);
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    }, (responseError) => {
      this.toastrService.warning(responseError.error.message);
    });
  }

  deleteCarImageById(carImageId: number) {
    this.carImageService.deletCarImageById(carImageId).subscribe((response) => {
      this.toastrService.success(response.message);
    });
  }

  deleteCarImage(carImage: CarImage) {
    this.carImageService.deleteCarImage(carImage).subscribe((response) => {
      this.toastrService.success(response.message);
    }, (responseError) => {
      if (responseError.error.Errors) {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i]);
          }
        }
      } else {
        this.toastrService.error(responseError.error.Message);
      }
    });
  }

  deleteCar() {
    this.carService.delete(this.car).subscribe(response => {
      this.toastrService.success(response.message);
      this.router.navigate(["cars"]);
    }, (responseError) => {
      if (responseError.error.Errors) {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i]);
          }
        }
      } else {
        this.toastrService.error(responseError.error.Message);
      }
    })
  }

  update() {
    let carModel: PlainCar = Object.assign({id: this.car.id}, this.carUpdateForm.value);
    if (this.carUpdateForm.valid) {
      this.carService.update(carModel).subscribe((response) => {
          this.toastrService.success("Car is updated successfully.");
        },
        (responseError) => {
          if (responseError.error.Errors) {
            if (responseError.error.Errors.length > 0) {
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(responseError.error.Errors[i]);
              }
            }
          } else {
            this.toastrService.error(responseError.error.Message);
          }
        });
    } else {
      this.toastrService.error("Complete the form!");
    }
  }

  setCurrentRouteToImageUpload(carId: string) {
    this.router.navigate([`upload/${carId}`]);
  }
}
