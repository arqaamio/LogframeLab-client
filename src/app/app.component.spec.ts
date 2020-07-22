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
import { NgZorroAntdModule, NzLayoutModule, NzGridModule, NzUploadModule, NzMessageModule, NzListModule, NzTagModule, NzButtonModule, NzTableModule, NzStepsModule, NzProgressModule, NzAlertModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './pages/home/home.component';
import { SelectdocumentComponent } from './pages/indicator/selectdocument/selectdocument.component';
import { IndicatorfiltersComponent } from './pages/indicator/indicatorfilters/indicatorfilters.component';
import { ScanDocumentComponent } from './pages/indicator/scandocument/scandocument.component';
import { ScanResultComponent } from './pages/indicator/scanresult/scanresult.component';
import { VisualisationresultComponent } from './pages/indicator/visualisationresult/visualisationresult.component';
import { DownloadresultComponent } from './pages/indicator/downloadresult/downloadresult.component';
import { ProfileMenuModule } from './profile-menu/profile-menu.module';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: 'dataprotection', component: DataprotectionComponent },
  { path: 'terms', component: TermsofuseComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'login', component: SigninComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  { path: '', component: IndicatorComponent, pathMatch: 'full' },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard]
  },
];
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
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
        IndicatorfiltersComponent,
        ScanDocumentComponent,
        ScanResultComponent,
        VisualisationresultComponent,
        DownloadresultComponent,
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
