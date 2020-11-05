import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DataprotectionComponent } from './pages/dataprotection/dataprotection.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { SelectdocumentComponent } from './pages/indicator/selectdocument/selectdocument.component';
import { ScanResultComponent } from './pages/indicator/scanresult/scanresult.component';
import { VisualisationresultComponent } from './pages/indicator/visualisationresult/visualisationresult.component';
import { DownloadResultComponent } from './pages/indicator/downloadresult/downloadresult.component';
import { routes } from './app.module';
import { HttpClientModule } from '@angular/common/http';
import { IndicatorService } from './services/indicator.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { APP_BASE_HREF } from '@angular/common';
import { NotFoundComponent } from './pages/notfound/notfound.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        NotFoundComponent
      ],
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NzLayoutModule,
        NzGridModule,
        NzUploadModule,
        NzMessageModule,
        NzListModule,
        NzTagModule,
        NzButtonModule,
        NzSpinModule,
        NzTableModule,
        NzStepsModule,
        NzProgressModule,
        NzAlertModule,
        NzIconModule,
        NzDropDownModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  });

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
});
