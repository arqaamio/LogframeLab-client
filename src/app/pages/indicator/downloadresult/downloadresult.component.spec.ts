import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DownloadresultComponent } from "./downloadresult.component";

describe("DownloadresultComponent", () => {
  let component: DownloadresultComponent;
  let fixture: ComponentFixture<DownloadresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadresultComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
