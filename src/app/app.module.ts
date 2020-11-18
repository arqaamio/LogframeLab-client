import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { registerLocaleData, APP_BASE_HREF, CommonModule } from '@angular/common';

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
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/auth.guard';
import { JwtInterceptor } from './utils/auth/jwt.interceptor';
import { DefaultInterceptor } from './utils/http/default.interceptor';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import {ResponseJwtInterceptor} from './utils/auth/response-jwt.interceptor';
import {InvalidJwtInterceptor} from './utils/auth/invalid-jwt.interceptor';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import {RxStompService, InjectableRxStompConfig, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {rxStompConfig} from './configuration/rxstomp.config'
import { ErrorHandlerService } from './services/errorhandler.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IndicatorsUploadModule } from './indicators-upload/indicators-upload.module';
import { StatisticsModule } from './pages/statistics/statistics.module';
import { DataProtectionModule } from './pages/dataprotection/dataprotection.module';
import { ImprintModule } from './pages/imprint/imprint.module';
import { NotFoundModule } from './pages/notfound/notfound.module';
import { TermsOfUseModule } from './pages/termsofuse/termsofuse.module';
import { IndicatorModule } from './pages/indicator/indicator.module';
import { LoginModule } from './pages/login/login.module';
import { DialogModule } from './components/dialog/dialog.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ManageIndicatorsModule } from './manage-indicators/manage-indicators.module';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

export const routes: Routes = [
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules}),
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
    { provide: NZ_I18N, useValue: en_US },
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidJwtInterceptor,
      multi: true
    },
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseJwtInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
