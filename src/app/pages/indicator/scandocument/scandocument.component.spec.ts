import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanDocumentComponent } from './scandocument.component';

describe('ScanDocumentComponent', () => {
  let component: ScanDocumentComponent;
  let fixture: ComponentFixture<ScanDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
