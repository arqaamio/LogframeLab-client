import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCostsComponent } from './add-costs.component';

describe('AddCostsComponent', () => {
  let component: AddCostsComponent;
  let fixture: ComponentFixture<AddCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
