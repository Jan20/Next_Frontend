import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Market } from '../market-model/market'
import { MarketService } from '../market-service/market.service';

@Component({
  selector: 'app-market-add',
  templateUrl: './market-add.component.html',
  styleUrls: ['./market-add.component.scss']
})
export class MarketAddComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Add Market'
  private name: string
  private category: string

  //////////////////
  // FormControls //
  //////////////////
  public nameFormControl: FormControl = new FormControl()
  public categoryFormControl: FormControl = new FormControl()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    public marketService: MarketService,
  ) {}

  ngOnInit() {
    this.nameFormControl.valueChanges.subscribe(name => this.name = name)
    this.categoryFormControl.valueChanges.subscribe(category => this.category = category)
  }

  ///////////////
  // Functions //
  ///////////////
  public addMarket(): void {
    this.marketService.addMarket(this.name, this.category)
    this.nameFormControl.reset()
    this.categoryFormControl.reset()
  }
}