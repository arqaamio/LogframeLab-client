import { Component, OnInit } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  numTotalIndicators: number = 0;
  counterSectorLevel: any[] = [];
  statisticsData: any[] = [];

  constructor(private indicatorService: IndicatorService, private statisticService: StatisticService) {
  }

  ngOnInit() {
      this.indicatorService.getTotalNumIndicators().subscribe(res=>{
          this.numTotalIndicators = res;
      });
      this.indicatorService.getIndicatorsByLevelAndSector().subscribe(res=> {
        this.counterSectorLevel = []
        res.forEach(element => {
            let item = {sector: element.sector, IMPACT: 0, OUTCOME: 0, OUTPUT: 0};
            element.counter.forEach(el => {
                item[el.level] = el.count;
            });
            this.counterSectorLevel.push(item);
        });
      });
      this.statisticService.getStatistics().subscribe(res=> {
        res.forEach(x=> {
          x.date = (<string> x.date).substring(0, 7);
        })
        this.statisticsData = res;
      });
  }
}
