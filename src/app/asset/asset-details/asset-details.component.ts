import { Component, OnInit } from '@angular/core'
import { Asset } from '../asset-model/asset'
import { ActivatedRoute, Router } from '@angular/router'
import { AssetService } from '../asset-service/asset.service'
import { BackendService } from '../../config/backend/backend.service'
import { Entry } from '../asset-model/entry'


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  pieChartData: any =  {
    chartType: 'LineChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {
      animation: {easing: 'out'},
      minorTicks: 5,
      majorTicks: ['0', '1', '2', '3', '4', '5'],
      backgroundColor: 'transparent',
      colors: ['#D2965A', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
      legend: 'none',
    },
    animation: {
      duration: 1500,
      easing: 'linear',
      startup: true
    },
  };


  public asset: Asset = this.assetService.getAsset()
  public series: any[] = []
  private line_ChartData: any
  private line_ChartOptions: any
  public lineChartLabels:Array<any> = []

  private timeSeries: any = null
  private trainPredictions: any = null
  private testPredictions: any = null

  multi: any[] = [
    {
      name: 'Cyan',
      series: [
        {
          name: 5,
          value: 2650
        }
      ]
    }
  ]
  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,
    private backendService: BackendService,
  ) {}





  getLegendOptions() {
    const opts = {
      scaleType: 'ordinal',
      colors: undefined,
      domain: [],
      title: undefined
    };
  }





  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.assetService.fetchAsset(params['marketId'], params['assetId']))
    this.activatedRoute.params.subscribe(params => this.assetService.fetchTimeSeries(params['marketId'], params['assetId']))
    this.activatedRoute.params.subscribe(params => this.assetService.fetchTrainPredictions(params['marketId'], params['assetId']))
    this.activatedRoute.params.subscribe(params => this.assetService.fetchTestPredictions(params['marketId'], params['assetId']))
    this.assetService.assetSubject.subscribe(asset => this.asset = asset)

    



    this.assetService.timeSeriesSubject.subscribe(timeSeries => {
      let series: any[] = [['Date', 'Value']]
        timeSeries.forEach(value => series.push([new Date(value.date), +value.close]))
      console.log(series)
      this.pieChartData =  {
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
      };
    })




    this.assetService.timeSeriesSubject.subscribe(timeSeries => {
      let series = []
      timeSeries.forEach(value => series.push({ name: new Date(value.date), value: +value.close }))
      this.createGraph({ name: 'Time Series', series: series })
    })

    this.assetService.trainPredictionsSubject.subscribe(trainPredictions => {
      let series = []
      trainPredictions.forEach(value => series.push({ name: new Date(value.date), value: +value.predicted_close }))
      this.createGraph({ name: 'Train Predictions', series: series })
    })

    this.assetService.testPredictionsSubject.subscribe(testPredictions => {
      let series = []
      console.log('testPredictions')
      testPredictions.forEach(value => series.push({ name: new Date(value.date), value: +value.predicted_close }))
      console.log({ name: 'Test Predictions', series: series })
      this.createGraph({ name: 'Test Predictions', series: series })
    })    
  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetOverview(): void {
    this.activatedRoute.params.subscribe( params => {
      this.router.navigate([`/markets/${params['marketId']}`])
    })
  }

  private createGraph(series: any): void {
    
    switch(series.name) {
      case 'Test Predictions': this.testPredictions = series; break;
      case 'Time Series': this.timeSeries = series; break;
      case 'Train Predictions': this.trainPredictions = series; break;
    }
    console.log(this.timeSeries)
    console.log(this.trainPredictions)
    console.log(this.testPredictions)
    // if (this.timeSeries != null && this.trainPredictions != null && this.testPredictions != null) {
      if (this.timeSeries != null) {
        // this.multi = [this.timeSeries, this.trainPredictions, this.testPredictions]
        this.multi = [this.timeSeries]
    }

  }


  view: any[] = [1274, 400]

  ///////////////////
  // Chart Options //
  ///////////////////
  public showXAxis = true
  public showYAxis = true
  public gradient = true
  public showLegend = true
  public showXAxisLabel = true
  public xAxisLabel = 'Date'
  public showYAxisLabel = true
  public yAxisLabel = 'Stock Price'
  public timeline = false
  public hideLegend = false
  public hideXAxisLabel = false
  public hideYAxisLabel = false
  public showGridLines = true

  colorScheme = {
    domain: ['#ffffff', '#dca042', '#C7B42C', '#AAAAAA']
  }

  // line, area
  autoScale = true
  
  
  onSelect(event) {
    console.log(event)
  }
  
}


