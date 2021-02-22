import { Component, OnInit } from '@angular/core';
import {ActivitiesService} from '../../../../services/activities.service';

@Component({
  selector: 'app-add-assumptions',
  templateUrl: './add-assumptions.component.html',
  styleUrls: ['./add-assumptions.component.scss']
})
export class AddAssumptionsComponent implements OnInit {

  constructor(
    public activitiesService: ActivitiesService

  ) { }

  ngOnInit(): void {
  }

}
