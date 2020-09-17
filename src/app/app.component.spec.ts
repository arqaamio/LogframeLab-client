import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { DataprotectionComponent } from './pages/dataprotection/dataprotection.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroAntdModule, NzListModule } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { SelectdocumentComponent } from './pages/indicator/selectdocument/selectdocument.component';
import { ScanResultComponent } from './pages/indicator/scanresult/scanresult.component';
import { VisualisationresultComponent } from './pages/indicator/visualisationresult/visualisationresult.component';
import { DownloadResultComponent } from './pages/indicator/downloadresult/downloadresult.component';
import { ProfileMenuModule } from './profile-menu/profile-menu.module';
import { routes } from './app.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        NzLayoutModule,
        NzGridModule,
        NzUploadModule,
        NzMessageModule,
        NzListModule,
        NzTagModule,
        NzButtonModule,
        NzTableModule,
        NzStepsModule,
        NzProgressModule,
        NzAlertModule,
        ProfileMenuModule,
      ],
      declarations: [
        AppComponent,
        IndicatorComponent,
        DialogComponent,
        HomeComponent,
        TermsofuseComponent,
        DataprotectionComponent,
        SigninComponent,
        SignupComponent,
        ImprintComponent,
        SelectdocumentComponent,
        ScanResultComponent,
        VisualisationresultComponent,
        DownloadResultComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LogframeLab'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('LogframeLab');
  });

  // it('should render title', () => {
  //  const fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  const compiled = fixture.debugElement.nativeElement;
  //  expect(compiled.querySelector('.content span').textContent).toContain('client app is running!');
  // });
});
