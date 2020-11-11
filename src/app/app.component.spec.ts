import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { routes } from './app.module';
import { DialogModule } from './components/dialog/dialog.module';
import { IndicatorsUploadModule } from './indicators-upload/indicators-upload.module';
import { ManageIndicatorsModule } from './manage-indicators/manage-indicators.module';
import { DataProtectionModule } from './pages/dataprotection/dataprotection.module';
import { ImprintModule } from './pages/imprint/imprint.module';
import { IndicatorModule } from './pages/indicator/indicator.module';
import { LoginModule } from './pages/login/login.module';
import { NotFoundModule } from './pages/notfound/notfound.module';
import { StatisticsModule } from './pages/statistics/statistics.module';
import { TermsOfUseModule } from './pages/termsofuse/termsofuse.module';
import { UserManagementModule } from './user-management/user-management.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        NzButtonModule,
        NzDropDownModule,
        NzGridModule,
        NzIconModule,
        NzLayoutModule,
        NzMessageModule,
        DialogModule,
        DataProtectionModule,
        IndicatorModule,
        ImprintModule,
        TermsOfUseModule,
        StatisticsModule,
        LoginModule,
        IndicatorsUploadModule,
        UserManagementModule,
        ManageIndicatorsModule,
        NotFoundModule
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
