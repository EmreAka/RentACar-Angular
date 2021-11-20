import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourComponent } from './colour.component';

describe('ColourComponent', () => {
  let component: ColourComponent;
  let fixture: ComponentFixture<ColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
