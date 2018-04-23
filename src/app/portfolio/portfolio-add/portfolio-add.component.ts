import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { PortfolioService } from '../portfolio-service/portfolio.service';
import { Asset } from '../../asset/asset-model/asset';
import { AssetService } from '../../asset/asset-service/asset.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html',
  styleUrls: ['./portfolio-add.component.scss']
})
export class PortfolioAddComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////

  
  //////////////////
  // FormControls //
  //////////////////
  
  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    

  ) {}
  
  ngOnInit() {
  
  
  }
  
  ///////////////
  // Functions //
  ///////////////
 
}