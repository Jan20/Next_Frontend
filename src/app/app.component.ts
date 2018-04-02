import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MenuService } from './menu/menu-service/menu.service';
import { MatSidenavContainer, MatDrawer } from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  @ViewChild(MatDrawer) matDrawer: MatDrawer

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private menuService: MenuService,

  ) {

    this.menuService.menuFlagSubject.subscribe( menuFlag => {

      menuFlag === true ? this.matDrawer.open() : this.matDrawer.close()
  
    })

  }

}