import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { MenuItem } from '../menu-model/menu.item';

// Services
import { MenuService } from '../menu-service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: String = 'Next';
  public items: MenuItem[];

  //////////////////
  // Constructors //
  //////////////////
  constructor(

    private router: Router,
    public menuService: MenuService
  
  ) {
  
    this.items = [];
    this.items.push(
      new MenuItem('Tasks', 'check_circle', '/tasks'),
      new MenuItem('Quotes', 'format_quote', '/quotes'),
      new MenuItem('Markets', 'grain', '/markets'),
      new MenuItem('User', 'lock_open', '/user'),
    );
  
  }

  ngOnInit() {}

  ///////////////
  // Functions //
  ///////////////
  public navigateToMenuEntry(item: MenuItem): void {
    this.router.navigate([item.getLink()]);
  }

}
