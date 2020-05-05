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
  listOfSelectedThemeValues: string[] = [];
  selectedSources: String[] = [];
  selectedLevels: Number[] = [];
  selectedSdgCodes: String[] = [];

  public themesFilterOptions: String[];
  public descriptionsFilterOptions: String[];
  public sourcesFilterOptions: String[];
  public levelsFilterOptions: Level[];
  public sdgCodesFilterOptions: String[];

  constructor(private indicatorService: IndicatorService) { }

  ngOnInit() {
    this.indicatorSubscribtion = this.indicatorService.getIndicatorSubject().pipe(take(1), tap(data => {
      console.log("fetch filters");
      if (data != null && data.filters != null) {
        if (data.filters.themes != null)
          this.listOfSelectedThemeValues = data.filters.themes;
      }
    })).subscribe();

    this.indicatorService.getThemes().subscribe(data => {
      this.listOfOption = data;
    });

    this.indicatorService.getFilters().subscribe(filters => {
      this.themesFilterOptions = filters.themes;
      this.descriptionsFilterOptions = filters.descriptions;
      this.sourcesFilterOptions = filters.sources;
      this.levelsFilterOptions = filters.levels;
      this.sdgCodesFilterOptions = filters.sdgCodes;
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
  isNotSelected(selectedValues: any[], value: any): boolean {
    return selectedValues.indexOf(value) === -1;
  }
}
