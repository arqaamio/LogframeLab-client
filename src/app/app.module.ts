import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';

import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzProgressModule } from 'ng-zorro-antd/progress';

import {HomeComponent} from './pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {IndicatorComponent} from './pages/indicator/indicator.component';
import {TermsofuseComponent} from './pages/termsofuse/termsofuse.component';
import {DataprotectionComponent} from './pages/dataprotection/dataprotection.component';
import {IndicatorfiltersComponent} from './pages/indicator/indicatorfilters/indicatorfilters.component';
import {SigninComponent} from './pages/signin/signin.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ImprintComponent} from './pages/imprint/imprint.component';
import {SelectdocumentComponent} from './pages/indicator/selectdocument/selectdocument.component';
import {ScanresultComponent} from './pages/indicator/scanresult/scanresult.component';
import {VisualisationresultComponent} from './pages/indicator/visualisationresult/visualisationresult.component';
import {DownloadresultComponent} from './pages/indicator/downloadresult/downloadresult.component';
import {ScanDocumentComponent} from './pages/indicator/scandocument/scandocument.component';
import {DialogComponent} from './dialog/dialog.component';
import {ProfileMenuModule} from './profile-menu/profile-menu.module';
import {AuthGuard} from './utils/auth.guard';
import {JwtInterceptor} from './utils/auth/jwt.interceptor';
import {DefaultHeaderInterceptor} from './utils/http/header.interceptor';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';

registerLocaleData(en);

const routes: Routes = [
  { path: 'dataprotection', component: DataprotectionComponent },
  { path: 'terms', component: TermsofuseComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'login', component: SigninComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent },
  {
    path: 'manage-indicators',
    loadChildren: () => import('./manage-indicators/manage-indicators.module').then(m => m.ManageIndicatorsModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'indicators-upload',
    loadChildren: () => import('./indicators-upload/indicators-upload.module').then(m => m.IndicatorsUploadModule)
  },
  { path: '', component: IndicatorComponent},
];
@NgModule({
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
    ScanresultComponent,
    VisualisationresultComponent,
    DownloadresultComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
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
    NzMenuModule,
    NzInputModule,
    NzFormModule,
  ],
  providers: [{provide: NZ_I18N, useValue: en_US},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultHeaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
