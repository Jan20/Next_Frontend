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
  public timeSeries: Entry[] = []
  public temp: number[] = []
  public dates: any[] = []
  private line_ChartData: any;
  private line_ChartOptions: any;
  
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

    this.activatedRoute.params.subscribe(params => {
      this.assetService.assetSubject.subscribe(asset => this.asset = asset)
      this.assetService.fetchAsset(params['marketId'], params['assetId'])
    })
  
    this.activatedRoute.params.subscribe(params => {
      this.timeSeries = []
      this.assetService.timeSeriesSubject.subscribe(timeSeries => {
        this.temp = []
        this.dates = []
        timeSeries.forEach(entry => {
          this.temp.push(entry.close)
          this.dates.push(entry.date)
        });

        var r = []
        for (let i = this.temp.length-1; i > this.temp.length-20; i-- ){
          r.push(this.temp[i])
        }

        this.lineChartData = [
          {data: r, label: 'BMW'},
        ];        
      })
      this.assetService.fetchTimeSeries(params['marketId'], params['assetId'])

    })

    // this.backendService.connectToBackend()
  }

  ///////////////
  // Functions //
  ///////////////
  public showAssetOverview(): void {
    this.activatedRoute.params.subscribe( params => {
      this.router.navigate([`/markets/${params['marketId']}`])
    })
  }


  // lineChart
  public lineChartData:Array<any> = [
    {data: this.temp, label: 'Series A'},
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];


  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}


