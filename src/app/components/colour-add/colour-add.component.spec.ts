import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourAddComponent } from './colour-add.component';

describe('ColourAddComponent', () => {
  let component: ColourAddComponent;
  let fixture: ComponentFixture<ColourAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
