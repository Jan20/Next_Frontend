import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../../asset/asset-service/asset.service';
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Asset } from '../../asset/asset-model/asset';
import { Portfolio } from '../portfolio-model/portfolio';

@Component({
  selector: 'app-portfolio-graph',
  templateUrl: './portfolio-graph.component.html',
  styleUrls: ['./portfolio-graph.component.scss']
})
export class PortfolioGraphComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Portfolio'
  public pieChartData: any =  {
    chartType: 'LineChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      [4,     1],
      [4,     2],
      [4,     3],
    ],
    options: {
      animation: {easing: 'out'},
      minorTicks: 5,
      majorTicks: ['0', '1', '2', '3', '4', '5'],
      backgroundColor: 'transparent',
      colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      legend: 'none',
    }
  };
  public series: any[] = []
  private line_ChartData: any
  private line_ChartOptions: any
  public lineChartLabels:Array<any> = []
  private timeSeries: any = null
  private trainPredictions: any = null
  private testPredictions: any = null


  ///////////////
  // Variables //
  ///////////////
  public asset: Asset = this.assetService.getAsset()
  public portfolio: Portfolio = new Portfolio(0,0)
  public cash: number = 0

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private portfolioService: PortfolioService,
    
  ) {}

  ngOnInit() {
    
    this.portfolioService.fetchPortfolio('default_portfolio')
    this.portfolioService.portfolioSubject.subscribe(portfolio => {
     
      this.cash = +portfolio.cash
      console.log('__________________________________')
      console.log(portfolio.cash)
      this.portfolio = this.portfolio
      
    })

    this.activatedRoute.params.subscribe(params => {
      
      this.assetService.fetchAsset(params['marketId'], params['assetId'])
      this.assetService.fetchTimeSeries(params['marketId'], params['assetId'])
      this.assetService.fetchShortTermPredictions(params['marketId'], params['assetId'])

    })

    this.assetService.assetSubject.subscribe(asset => this.asset = asset)
    
    
    // this.assetService.timeSeriesSubject.subscribe(timeSeries => {
    //   let series: any[] = [['Date', 'Value']]

    //   timeSeries.forEach(value => series.push([new Date(value.date), +value.close]))

    //   this.assetService.shortTermPredictionsSubject.subscribe(shortTermPredictions => {
        
    //     shortTermPredictions.forEach(value => series.push([new Date(value.date), +value.predicted_close]))

    //   console.log(series)
    //   this.pieChartData =  {
    //     chartType: 'LineChart',
    //     dataTable: series,
    //     options: {
    //       animation: {easing: 'out'},
    //       minorTicks: 5,
    //       majorTicks: ['0', '1', '2', '3', '4', '5'],
    //       backgroundColor: 'transparent',
    //       colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    //       legend: 'none',
    //     } ,
    //     animation: {
    //       duration: 1500,
    //       easing: 'linear',
    //       startup: true
    //     },
    //   };
    // })

    // this.assetService.timeSeriesSubject.subscribe(timeSeries => {
    //   let series = []
    //   timeSeries.forEach(value => series.push({ name: new Date(value.date), value: +value.close }))
    // })

    // this.assetService.trainPredictionsSubject.subscribe(trainPredictions => {
    //   let series = []
    //   trainPredictions.forEach(value => series.push({ name: new Date(value.date), value: +value.predicted_close }))
    // })

    // this.assetService.testPredictionsSubject.subscribe(testPredictions => {
    //   let series = []
    //   console.log('testPredictions')
    //   testPredictions.forEach(value => series.push({ name: new Date(value.date), value: +value.predicted_close }))
    //   console.log({ name: 'Test Predictions', series: series })
    // })    
    // })
      
      
  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetOverview(): void {
    this.activatedRoute.params.subscribe( params => {
      this.router.navigate([`/markets/${params['marketId']}`])
    })
  }

  
  public showCash(): void {

    this.router.navigate(['/portfolio/cash'])

  }


}
