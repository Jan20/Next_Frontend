import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.scss']
})
export class PortfolioOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    private router: Router,
  ) {}

  ngOnInit() {
  }

  ///////////////
  // Functions //
  ///////////////

}
