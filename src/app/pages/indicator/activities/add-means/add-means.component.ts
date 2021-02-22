import { Component, OnInit } from '@angular/core';
import {ActivitiesService} from '../../../../services/activities.service';

@Component({
  selector: 'app-add-means',
  templateUrl: './add-means.component.html',
  styleUrls: ['./add-means.component.scss']
})
export class AddMeansComponent implements OnInit {

  constructor(
    public activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {
  }

}
