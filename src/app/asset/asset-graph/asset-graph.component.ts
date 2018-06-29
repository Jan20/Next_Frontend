import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssetService } from '../asset-service/asset.service';

@Component({
  selector: 'app-asset-graph',
  templateUrl: './asset-graph.component.html',
  styleUrls: ['./asset-graph.component.scss']
})
export class AssetGraphComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private line_ChartData: any
  private line_ChartOptions: any
  private timeSeries: any = null
  public lineChartLabels:Array<any> = []
  public secondTitle: string = 'Performance'
  public series: any[] = []

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
      this.assetService.fetchShortTermTestPredictions(params['marketId'], params['assetId'])

    })
    
    this.assetService.timeSeriesSubject.subscribe(timeSeries => {
 
      let series: any[] = [['Date', 'Value']]

      timeSeries.forEach(entry => {
        
        series.push([new Date(entry.date), +entry.value])
        
      })
      
      this.drawChart(series)
      
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
        colors: ['rgb(255, 255, 255)', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
        legend: 'none',
        hAxis: {gridlines: {color: '#FFFFFF'}},
        vAxis: {gridlines: {color: '#FFFFFF'}}
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
      ['Task', 'Hours per Day', 'Prediction', 'Test'],
    ],
    options: {
      animation: {easing: 'out'},
      minorTicks: 5,
      majorTicks: ['0', '1', '2', '3', '4', '5'],
      backgroundColor: 'transparent',
      colors: ['#D2965A', '#e6693e', '#800000', '#800000', '#f6c7b6'],
      legend: 'none',
    }
  }

  public showChart(days: number) {

    console.log(this.series)
    // let short_series = this.series
    // console.log(days)

  }


}
