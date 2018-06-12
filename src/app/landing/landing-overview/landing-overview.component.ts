import { Component, OnInit } from '@angular/core';

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
  public subtitle: string = 'An Algorithmic Trading Approach'

  constructor() { }

  ngOnInit() {
  }

}
