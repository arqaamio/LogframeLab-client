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
  dataSet: any[] = [];
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
      // this.statisticsData = [
      //   {
      //       date: '2020-10',
      //       downloadDFIDTemplate: 5,
      //       downloadPRMTemplate: 2,
      //       downloadWordTemplate: 44,
      //       downloadXLSXTemplate: 8,
      //   },{
      //     date: '2020-11',
      //     downloadDFIDTemplate: 10,
      //     downloadPRMTemplate: 22,
      //     downloadWordTemplate: 5,
      //     downloadXLSXTemplate: 8,
      // }]
      this.statisticService.getStatistics().subscribe(res=> {
        this.statisticsData = res;
      });
  }
}
