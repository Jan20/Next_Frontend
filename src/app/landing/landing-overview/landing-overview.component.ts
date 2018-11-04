import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-overview',
  templateUrl: './landing-overview.component.html',
  styleUrls: ['./landing-overview.component.scss']
})
export class LandingOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Momentum'
  public subtitle: string = 'Advanced Financial Algorithms'

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router

  ) { }

  ngOnInit() {} 

  ///////////////
  // Functions //
  ///////////////
  public switchToPredictions(): void {

    this.router.navigate(['markets/nasdaq/assets'])

  }

}
