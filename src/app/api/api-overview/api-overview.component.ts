import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-overview',
  templateUrl: './api-overview.component.html',
  styleUrls: ['./api-overview.component.scss']
})
export class ApiOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Application Programming Interface'

  constructor() { }

  ngOnInit() {
  }

}
