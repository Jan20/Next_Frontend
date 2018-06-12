import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service/api.service'

@Component({
  selector: 'app-api-series',
  templateUrl: './api-series.component.html',
  styleUrls: ['./api-series.component.scss']
})
export class ApiSeriesComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Series'

  constructor(

    public apiService: ApiService

  ) { }

  ngOnInit() {
  }

}
