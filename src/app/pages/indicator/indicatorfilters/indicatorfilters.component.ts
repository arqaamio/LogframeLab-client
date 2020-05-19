import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {FilterDto, Level} from 'src/app/services/dto/filter.dto';

@Component({
  selector: 'app-indicatorfilters',
  templateUrl: './indicatorfilters.component.html',
  styleUrls: ['./indicatorfilters.component.scss']
})
export class IndicatorfiltersComponent implements OnInit, OnDestroy {


  indicatorSubscription:Subscription = null;

  selectedValues = new FilterDto();

  filterOptions = new FilterDto();

  constructor(private indicatorService: IndicatorService) { }

  ngOnInit() {
    this.indicatorSubscription = this.indicatorService.getIndicatorSubject().pipe(take(1), tap(data => {
      if (data != null && data.filters != null) {
        this.selectedValues = data.filters;
      }
    })).subscribe();

    this.indicatorService.getFilters().subscribe(filters => {
      this.filterOptions = filters;
    });
  }
  ngOnDestroy(){
    this.indicatorSubscription.unsubscribe();
  }
  onChangeFilter(filter: string, event: any) {
    this.selectedValues[filter] = event;
    this.indicatorService.setFilters(this.selectedValues);
  }

  isNotSelected(filter: string, value: any): boolean {
    return this.selectedValues[filter].indexOf(value) === -1;
  }

  compare = (level1: Level, level2: Level) => (level1 && level2 ? level1.id === level2.id : level1 === level2);
}
