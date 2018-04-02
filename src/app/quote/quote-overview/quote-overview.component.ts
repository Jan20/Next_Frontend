import { Component, OnInit, ViewChild } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore'
import { MenuService } from '../../menu/menu-service/menu.service'
import { MatSidenavContainer, MatDrawer } from '@angular/material/sidenav'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router';

// Models
import { Quote } from './../quote-model/quote'

// Services
import { UserService } from '../../user/user-service/user.service'
import { QuoteService } from '../quote-service/quote.service'

@Component({
  selector: 'app-quote-overview',
  templateUrl: './quote-overview.component.html',
  styleUrls: ['./quote-overview.component.scss']
})
export class QuoteOverviewComponent implements OnInit {
  
  @ViewChild(MatDrawer) matDrawer: MatDrawer
  
  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Quotes'  

  public quotesCollection: AngularFirestoreCollection<Quote>
  public quotes: Quote[]
  public quote: Quote = new Quote('', '', '', '', 0)

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private menuService: MenuService,
    private router: Router,
    private quoteService: QuoteService,
  ) {
    this.menuService.setState('quote')
  }

  ngOnInit() {
    
    this.quotesCollection = this.angularFirestore.collection('users/bihhc6mTKZbZXmJ7Sf9e7mSriQ53/quotes')
  
    this.quotesCollection.valueChanges().subscribe( quotes => {
      this.quotes = []
      quotes.forEach( quote => { this.quotes.push(new Quote(quote.id, quote.author, quote.category, quote.quote, quote.score)) })
    })

    this.menuService.menuFlagSubject.subscribe( menuFlag => {
      menuFlag === true ? this.matDrawer.open() : this.matDrawer.close()
    })

  }

  ///////////////
  // Functions //
  ///////////////
  public viewQuote(quote: Quote): void {
    this.quoteService.setQuote(quote)
    this.router.navigate(['/quotes', quote.id]);
  }


}
