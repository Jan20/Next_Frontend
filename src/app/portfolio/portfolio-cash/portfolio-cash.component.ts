import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Portfolio } from '../portfolio-model/portfolio';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-portfolio-cash',
  templateUrl: './portfolio-cash.component.html',
  styleUrls: ['./portfolio-cash.component.scss']
})
export class PortfolioCashComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Deposits / Withdrawals'
  public portfolio: Portfolio = new Portfolio(0, 0)
  public cash: number = 0


  //////////////////
  // FormControls //
  //////////////////
  public cashFormControl: FormControl = new FormControl()
  

  //////////////////
  // Constructors //
  //////////////////
  constructor(
  
    private router: Router,
    private portfolioService: PortfolioService
  
  ) {}

  ngOnInit() {

    this.portfolioService.fetchPortfolio('default_portfolio')
    this.portfolioService.portfolioSubject.subscribe(portfolio => this.portfolio = portfolio)
    this.cashFormControl.valueChanges.subscribe(cash => this.cash = cash)

  }


  ///////////////
  // Functions //
  ///////////////
  public depositCash(): void {

    const updatedCash:number = +this.portfolio.cash + +this.cash
    this.portfolioService.updatePortfolio('default_portfolio', updatedCash)
    this.cashFormControl.reset()
    this.router.navigate(['/portfolio'])

  }

  public withdrawCash(): void {

    const updatedCash:number = +this.portfolio.cash - +this.cash

    this.portfolioService.updatePortfolio('default_portfolio', updatedCash)
    this.cashFormControl.reset()
    this.router.navigate(['/portfolio'])

  }

  public cancel(): void {

    this.cashFormControl.reset()
    this.router.navigate(['/portfolio'])

  }

}
