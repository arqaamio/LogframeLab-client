import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-indicatorfilters',
  templateUrl: './indicatorfilters.component.html',
  styleUrls: ['./indicatorfilters.component.scss']
})
export class IndicatorfiltersComponent implements OnInit, OnDestroy {


  indicatorSubscribtion:Subscription = null;

  indicatorFilter: string = "";
  themeFilter: string = "";

  // themes filter
  listOfOption = [];
  listOfSelectedValue: string[] = [];

  constructor(private indicatorService: IndicatorService) { }

  ngOnInit() {
    this.indicatorSubscribtion = this.indicatorService.getIndicatorSubject().pipe(take(1), tap(data => {
      console.log("fetch filters");
      if (data != null && data.filters != null) {
        if (data.filters.themes != null)
          this.listOfSelectedValue = data.filters.themes;
      }
    })).subscribe();

    this.indicatorService.getThemes().subscribe(data => {
      this.listOfOption = data;
    });
  }
  ngOnDestroy(){
    this.indicatorSubscribtion.unsubscribe();
  }
  onChangeThemeFiler(event) {
    this.indicatorService.setFilers({
      themes: event
    })
  }
  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }
}
