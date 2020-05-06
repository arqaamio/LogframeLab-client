import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IndicatorfiltersComponent } from "./indicatorfilters.component";

describe("IndicatorfiltersComponent", () => {
  let component: IndicatorfiltersComponent;
  let fixture: ComponentFixture<IndicatorfiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorfiltersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
