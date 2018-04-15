import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset-model/asset';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';
import { BackendService } from '../../config/backend/backend.service';
import { Entry } from '../asset-model/entry';


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////

  public asset: Asset = this.assetService.getAsset()
  public series: any[] = []
  private line_ChartData: any;
  private line_ChartOptions: any;
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
        },
        {
          name: 10,
          value: 2800      },
        {
          name: 15,
          value: 2000
        }
      ]
    },
    {
      name: 'Yellow',
      series: [
        {
          name: 5,
          value: 2500
        },
        {
          name: 10,
          value: 3100
        },
        {
          name: 15,
          value: 2350
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

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.assetService.fetchAsset(params['marketId'], params['assetId']))
    this.activatedRoute.params.subscribe(params => this.assetService.fetchTimeSeries(params['marketId'], params['assetId']))
    this.activatedRoute.params.subscribe(params => this.assetService.fetchTrainPredictions(params['marketId'], params['assetId']))
    this.activatedRoute.params.subscribe(params => this.assetService.fetchTestPredictions(params['marketId'], params['assetId']))
    this.assetService.assetSubject.subscribe(asset => this.asset = asset)

    this.assetService.timeSeriesSubject.subscribe(timeSeries => {
      let series = []
      timeSeries.forEach(value => series.push({ name: new Date(value.date), value: value.close }));
      this.createGraph({ name: 'Time Series', series: series })
    })

    this.assetService.trainPredictionsSubject.subscribe(trainPredictions => {
      let series = []
      trainPredictions.forEach(value => series.push({ name: new Date(value.date), value: value.predicted_close }));
      this.createGraph({ name: 'Train Predictions', series: series })
    })

    this.assetService.testPredictionsSubject.subscribe(testPredictions => {
      let series = []
      console.log('testPredictions')
      testPredictions.forEach(value => series.push({ name: new Date(value.date), value: value.predicted_close }));
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
    if (this.timeSeries != null && this.trainPredictions != null && this.testPredictions != null) {
      this.multi = [this.timeSeries, this.trainPredictions, this.testPredictions]
    }

  }


  view: any[] = [1274, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Stock Price';
  timeline = true;

  colorScheme = {
    domain: ['#dca042', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  
  
  onSelect(event) {
    console.log(event);
  }
  
}


