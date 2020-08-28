import { Component } from '@angular/core';
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  height: any = (window.screen.height - 140) + 'px';
  title = "LogframeLab";

  constructor() {}
}
