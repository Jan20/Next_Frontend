import { Component, ViewChild } from '@angular/core';
import { MenuService } from './menu/menu-service/menu.service';
import { MatDrawer } from '@angular/material/sidenav'
import { UserService } from './user/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  ///////////////
  // Variables //
  ///////////////
  @ViewChild(MatDrawer) matDrawer: MatDrawer

  //////////////////
  // Constructors //
  //////////////////
  public constructor(
    private menuService: MenuService,
    public userService: UserService
  ) {
    this.menuService.menuFlagSubject.subscribe( menuFlag => {
      menuFlag === true ? this.matDrawer.open() : this.matDrawer.close()
    })
  }

}