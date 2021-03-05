import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  public activitiesData: any[] = [];
  public activitiesList: any[] = [];
  public politicalMeans = '';
  public technicalMeans = '';
  public cost = '';
  public assumptions = '';
  financialMeans: any;
  materialMeans: any;
  humanMeans: any;
  constructor() { }
}
