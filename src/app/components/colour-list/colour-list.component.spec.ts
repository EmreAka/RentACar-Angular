import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColourListComponent } from './colour-list.component';

describe('ColourListComponent', () => {
  let component: ColourListComponent;
  let fixture: ComponentFixture<ColourListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColourListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
