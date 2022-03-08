import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCarListComponent } from './my-car-list.component';

describe('MyCarListComponent', () => {
  let component: MyCarListComponent;
  let fixture: ComponentFixture<MyCarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCarListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
