import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryService {

  ///////////////
  // Variables //
  ///////////////
  private inAddMode: boolean = false
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()

  //////////////////
  // Constructors //
  //////////////////
  constructor() { }

  ///////////////
  // Functions //
  ///////////////
  public toggleInAddMode(): void {

    this.inAddMode = this.inAddMode === false ? true : false
    this.inAddModeSubject.next(this.inAddMode)

  }

  /////////////
  // Getters //
  /////////////
  public getInAddMode(): boolean {
    
    return this.inAddMode

  }

}
