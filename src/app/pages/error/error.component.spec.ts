import { TestBed, ComponentFixture, inject, fakeAsync, tick } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IndicatorService } from 'src/app/services/indicator.service';
import { By, BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from 'src/app/app.module';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
            providers: [],
            declarations: [ErrorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {        
        expect((element.getElementsByTagName('h1').item(0) as HTMLElement).firstChild.nodeValue).toEqual('404');
        expect((element.getElementsByTagName('h3').item(0) as HTMLElement).firstChild.nodeName).toEqual('STRONG');
        expect((element.getElementsByTagName('h3').item(0) as HTMLElement).firstChild.firstChild.nodeValue).toEqual('Page Not Found');
        
        let button: HTMLElement = element.getElementsByTagName('button').item(0) as HTMLElement;
        expect(button).toBeTruthy();
        expect(button.firstChild.nodeValue).toBe('Home');
        expect(component).toBeTruthy();
    });

    it('should go to the main page', fakeAsync(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        let spy = spyOn(component, "goToHome");
        fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null)
        expect(spy).toHaveBeenCalled();
    })));

    afterEach(() => {
        fixture.destroy();
    });
});