import {ToastrService} from 'ngx-toastr';
import {CarService} from './../../services/car.service';
import {ColourService} from './../../services/colour.service';
import {Colour} from './../../models/colour';
import {Brand} from './../../models/brand';
import {BrandService} from './../../services/brand.service';
import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators, UntypedFormGroup, FormControl} from '@angular/forms';
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";
import {AuthService} from "../../services/auth.service";
import {EngineService} from "../../services/engine.service";
import {Engine} from "../../models/engine";
import {Fuel} from "../../models/fuel";
import {FuelService} from "../../services/fuel.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm: UntypedFormGroup;

  brands: Brand[];
  colours: Colour[];
  engines: Engine[];
  fuels: Fuel[];

  loading: Boolean = false;
  files: File[];

  imageSrc: any[] = [];

  constructor(private formBuilder: UntypedFormBuilder, private brandService: BrandService,
              private colourService: ColourService, private carService: CarService,
              private toastrService: ToastrService, private router: Router,
              private localStorageService: LocalStorageService, private authService: AuthService,
              private engineService: EngineService, private fuelService: FuelService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.getBrands();
    this.getColours();
    this.getEngines();
    this.getFuels();
    this.createCarAddForm();
    this.carAddForm.valueChanges.subscribe();
  }

  onChange(event: any) {
    this.imageSrc = [];
    if (event.target.files) {
      this.files = event.target.files;
      for (const [key, value] of Object.entries(this.files)) {
        // @ts-ignore
        let file: File = this.files[key];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc.push(reader.result as string);
        }
      }
    }
  }

  onUpload() {
    this.loading = !this.loading;
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      colourId: ["", Validators.required],
      engineId: ["", Validators.required],
      fuelId: ["", Validators.required],
      doorNumber: ["", Validators.required],
      fuelConsumption: ["", Validators.required],
      modelYear: ["", Validators.required],
      dailyPrice: [0, Validators.required],
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

  addWithImages() {
    this.spinner.show("s1");
    let carModel = Object.assign({userId: this.authService.decodedToken["UserId"]}, this.carAddForm.value);
    if (this.carAddForm.valid && this.files) {
      this.carService.addWithImages(this.files, carModel).subscribe((response) => {
        this.spinner.hide("s1");
        this.toastrService.success(`Car is added successfully`);
        this.router.navigate(["cars"]);
      }, (responseError) => {
        this.spinner.hide("s1");
        if (responseError.error.Errors) {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
            }
          }
        } else {
          this.spinner.hide("s1");
          this.toastrService.error(responseError.error.Message);
          this.router.navigate(["login"]);
          this.localStorageService.delete('token');
        }
      });
    } else {
      this.spinner.hide("s1");
      this.toastrService.error("Complete the form!");
    }
  }

  //Not in-use.
  add() {
    let carModel = Object.assign({userId: this.authService.decodedToken["UserId"]}, this.carAddForm.value);
    if (this.carAddForm.valid) {
      this.carService.add(carModel).subscribe((response) => {
        this.toastrService.success(`Car is added successfully`);
        this.router.navigate(["cars"]);
      }, (responseError) => {
        if (responseError.error.Errors) {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage);
            }
          }
        } else {
          this.toastrService.error(responseError.error.Message);
          this.router.navigate(["login"]);
          this.localStorageService.delete('token');
        }
      });
    } else {
      this.toastrService.error("Complete the form!");
    }
  }
}
