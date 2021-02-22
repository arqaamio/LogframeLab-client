import { Component, OnInit } from '@angular/core';
import {ActivitiesService} from '../../../../services/activities.service';

@Component({
  selector: 'app-add-costs',
  templateUrl: './add-costs.component.html',
  styleUrls: ['./add-costs.component.scss']
})
export class AddCostsComponent implements OnInit {

  constructor(
    public activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {
  }

}
