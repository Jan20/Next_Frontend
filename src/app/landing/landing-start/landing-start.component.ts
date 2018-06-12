import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { StartItem } from '../landing-model/start-item'

@Component({
  selector: 'app-landing-start',
  templateUrl: './landing-start.component.html',
  styleUrls: ['./landing-start.component.scss']
})
export class LandingStartComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public startItems: StartItem[] = []

  /////////////////
  // Constructor //
  /////////////////
  constructor(

    private router: Router,

  ) { }

  ngOnInit() {
    
    this.startItems[0] = new StartItem('Momentum Strategies', 'Start to learn more about investing using momentum strategies')
    this.startItems[1] = new StartItem('AI-powered Alogrithms', 'Get started with advanced ANN-based algrorithms')

  }

  public switchToMomentum(): void {

    this.router.navigate(['/momentum'])

  }

}
