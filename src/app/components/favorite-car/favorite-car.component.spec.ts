import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCarComponent } from './favorite-car.component';

describe('FavoriteCarComponent', () => {
  let component: FavoriteCarComponent;
  let fixture: ComponentFixture<FavoriteCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
