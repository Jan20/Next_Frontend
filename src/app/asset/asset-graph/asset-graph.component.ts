import { Component, OnInit } from '@angular/core';
import { Asset } from '../asset-model/asset';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';
import { BackendService } from '../../config/backend/backend.service';

@Component({
  selector: 'app-asset-graph',
  templateUrl: './asset-graph.component.html',
  styleUrls: ['./asset-graph.component.scss']
})
export class AssetGraphComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public series: any[] = []
  private line_ChartData: any
  private line_ChartOptions: any
  public lineChartLabels:Array<any> = []
  private timeSeries: any = null

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetService: AssetService,

  ) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.assetService.fetchTimeSeries(params['marketId'], params['assetId'])
      this.assetService.fetchShortTermPredictions(params['marketId'], params['assetId'])

    })
    
    this.assetService.timeSeriesSubject.subscribe(timeSeries => {
      
      let series: any[] = [['Date', 'Value', 'Prediction']]

      timeSeries.forEach(value => series.push([new Date(value.date), +value.close, undefined]))
      
      this.assetService.shortTermPredictionsSubject.subscribe(shortTermPredictions => {

        shortTermPredictions.forEach(shortTermPrediction => {

          series.push([new Date(shortTermPrediction.date), undefined, +shortTermPrediction.predicted_close])

        })

        this.drawChart(series)

      })

      
    })

  }

  ////////////
  // Helper //
  ////////////
  private drawChart(series: any): void {

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

  }

  public seriesData: any =  {

    chartType: 'LineChart',
    dataTable: [
      ['Task', 'Hours per Day', 'Prediction'],
      ['Work', 1, 1]
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


}
