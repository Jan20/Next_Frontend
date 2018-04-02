import { Injectable } from '@angular/core';
import { firestore } from 'firebase/app';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Quote } from '../quote-model/quote';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class QuoteService {

  ////////////////
  // Attributes //
  ////////////////
  private quote: Quote
  private inUpdateMode: boolean = false

  //////////////
  // Subjects //
  //////////////
  public quoteSubject: Subject<Quote> = new Subject<Quote>()
  public inUpdateModeSubject: Subject<boolean> = new Subject<boolean>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    
  
  ) {
    
  
  }

  ///////////////
  // Functions //
  ///////////////
  public toggleInUpdateMode(): void {
    if (this.inUpdateMode) {
      this.inUpdateMode = false
      this.inUpdateModeSubject.next(false)
    } else {
      this.inUpdateMode = true
      this.inUpdateModeSubject.next(true)
    }
  }

  /////////////
  // Getters //
  /////////////
  public getQuote(): Quote {
    return this.quote
  }

  public getInUpdateMode(): boolean {
    return this.inUpdateMode
  }

  /////////////
  // Setters //
  /////////////
  public setQuote(quote: Quote): void {
    this.quote = quote
    this.quoteSubject.next(quote)
  }

  public setInUpdateMode(inUpdateMode: boolean): void {
    this.inUpdateMode = inUpdateMode
    this.inUpdateModeSubject.next(inUpdateMode)
  }

}
