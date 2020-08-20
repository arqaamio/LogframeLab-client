import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Calls the router and redirects to home
   */
  goToHome(){
    this.router.navigate(['/'])
  }
}
