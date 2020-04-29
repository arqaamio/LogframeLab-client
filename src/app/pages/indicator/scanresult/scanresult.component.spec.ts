import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanresultComponent } from './scanresult.component';

describe('ScanresultComponent', () => {
  let component: ScanresultComponent;
  let fixture: ComponentFixture<ScanresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
