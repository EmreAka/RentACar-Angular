import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingModalComponent } from './renting-modal.component';

describe('RentingModalComponent', () => {
  let component: RentingModalComponent;
  let fixture: ComponentFixture<RentingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
