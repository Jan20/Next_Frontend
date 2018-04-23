import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset-model/asset';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';
import { BackendService } from '../../config/backend/backend.service';
import { PortfolioService } from '../../portfolio/portfolio-service/portfolio.service';

@Component({
  selector: 'app-asset-graph',
  templateUrl: './asset-graph.component.html',
  styleUrls: ['./asset-graph.component.scss']
})
export class AssetGraphComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public asset: Asset = new Asset('', '', '', '',)
  public series: any[] = []
  private line_ChartData: any
  private line_ChartOptions: any
  public lineChartLabels:Array<any> = []
  private timeSeries: any = null
  private trainPredictions: any = null
  private testPredictions: any = null

  public seriesData: any =  {
    chartType: 'LineChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     1],
    ],
    options: {
      animation: {easing: 'out'},
      minorTicks: 5,
      majorTicks: ['0', '1', '2', '3', '4', '5'],
      backgroundColor: 'transparent',
      colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      legend: 'none',
    }
  }

  public predictionData: any =  {
    chartType: 'LineChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     1],
    ],
    options: {
      animation: {easing: 'out'},
      minorTicks: 5,
      majorTicks: ['0', '1', '2', '3', '4', '5'],
      backgroundColor: 'transparent',
      colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      legend: 'none',
    }
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private backendService: BackendService,
    public portfolioService: PortfolioService,
  ) {
    
   }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.assetService.fetchAsset(params['marketId'], params['assetId'])
      this.assetService.fetchTimeSeries(params['marketId'], params['assetId'])
      this.assetService.fetchShortTermPredictions(params['marketId'], params['assetId'])

    })
    
    this.assetService.assetSubject.subscribe(asset => this.asset = asset)

    this.assetService.timeSeriesSubject.subscribe(timeSeries => {
      this.asset.series = timeSeries
      let series: any[] = [['Date', 'Value']]
      timeSeries.forEach(value => series.push([new Date(value.date), +value.close]))
      this.seriesData =  {
        chartType: 'LineChart',
        dataTable: series,
        options: {
          animation: {easing: 'out'},
          minorTicks: 5,
          majorTicks: ['0', '1', '2', '3', '4', '5'],
          backgroundColor: 'transparent',
          colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
          legend: 'none',
        } ,
        animation: {
          duration: 1500,
          easing: 'linear',
          startup: true
        },
      }
    })

    this.assetService.shortTermPredictionsSubject.subscribe(shortTermPredictions => {
      let prediction_series: any[] = [['Date', 'Value']]
      shortTermPredictions.forEach(value => prediction_series.push([new Date(value.date), +value.predicted_close]))
      this.predictionData =  {
        chartType: 'LineChart',
        dataTable: prediction_series,
        options: {
          animation: {easing: 'out'},
          minorTicks: 5,
          majorTicks: ['0', '1', '2', '3', '4', '5'],
          backgroundColor: 'transparent',
          colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
          legend: 'none',
        } ,
        animation: {
          duration: 1500,
          easing: 'linear',
          startup: true
        },
      }
    })
  }
}
