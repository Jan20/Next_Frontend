import { Component, OnInit } from '@angular/core';
import { Benefit } from '../landing-model/benefit'

@Component({
  selector: 'app-landing-benefits',
  templateUrl: './landing-benefits.component.html',
  styleUrls: ['./landing-benefits.component.scss']
})
export class LandingBenefitsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public benefits: Benefit[] = []

  /////////////////
  // Constructor //
  /////////////////
  constructor() { }

  ngOnInit() {
    
    this.benefits[0] = new Benefit('Discover', 'Find well-established as well as novel algorithms for automated trading')
    this.benefits[1] = new Benefit('Learn', 'Learn how to implement financial algorithms with a set of comprehensive guides')
    this.benefits[2] = new Benefit('Discuss', 'Become part of a cummunity and discuss financial ideas')

  }

}
