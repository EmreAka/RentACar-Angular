import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourEditComponent } from './colour-edit.component';

describe('ColourEditComponent', () => {
  let component: ColourEditComponent;
  let fixture: ComponentFixture<ColourEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
