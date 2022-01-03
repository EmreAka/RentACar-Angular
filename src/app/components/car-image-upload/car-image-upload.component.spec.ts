import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageUploadComponent } from './car-image-upload.component';

describe('CarImageUploadComponent', () => {
  let component: CarImageUploadComponent;
  let fixture: ComponentFixture<CarImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarImageUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
