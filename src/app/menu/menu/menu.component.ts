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
  public title: String = 'Flow';
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
      new MenuItem('Project', 'grain', '/projects'),
      new MenuItem('Profile', 'account_circle', '/profile'),
      new MenuItem('Stats', 'timeline', '/stats'),
      new MenuItem('Login', 'lock_open', '/login'),
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
