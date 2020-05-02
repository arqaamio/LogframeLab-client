import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FilterDto } from 'src/app/services/dto/filter.dto';

@Component({
  selector: 'app-indicatorfilters',
  templateUrl: './indicatorfilters.component.html',
  styleUrls: ['./indicatorfilters.component.scss']
})
export class IndicatorfiltersComponent implements OnInit, OnDestroy {


  indicatorSubscription:Subscription = null;

  // themes filter
  selectedValues = new FilterDto();

  filterOptions = new FilterDto();

  constructor(private indicatorService: IndicatorService) { }

  ngOnInit() {
    this.indicatorSubscription = this.indicatorService.getIndicatorSubject().pipe(take(1), tap(data => {
      console.log("fetch filters");
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
  isNotSelected(selectedValues: any[], value: any): boolean {
    return selectedValues.indexOf(value) === -1;
  }
}
