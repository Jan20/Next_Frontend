import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Quote } from '../quote-model/quote';
import { UserService } from '../../user/user-service/user.service';
import { QuoteService } from '../quote-service/quote.service';
import { MenuService } from '../../menu/menu-service/menu.service';

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private quoteCollection: AngularFirestoreCollection<Quote>
  private quoteId: string
  public quotes: Quote[]
  public quote: Quote = new Quote('', '', '', '', 0)
  public inUpdateMode: boolean = this.quoteService.getInUpdateMode()
  
  //////////////////
  // Constructors //
  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private quoteService: QuoteService,
    public menuService: MenuService
  ) { }

  ngOnInit() {
    
    this.quoteService.inUpdateModeSubject.subscribe(inUpdateMode => this.inUpdateMode = inUpdateMode)
    this.quoteCollection = this.angularFirestore.collection('users/'+ this.userService.getUser().getUserId() +'/quotes/') 
    
    this.route.params.subscribe(params => {
      this.quoteId = params['quoteId']
    });

    this.quoteCollection.valueChanges().subscribe(quotes => {
      this.quotes = []
      quotes.forEach(quote => {
        quotes.forEach( quote => { this.quotes.push(new Quote(quote.id, quote.author, quote.category, quote.quote, quote.score)) })
      })
      for(let quote of this.quotes) {
        quote.getId() === this.quoteId ? this.quote = quote : null 
        quote.getId() === this.quoteId ? this.quoteService.setQuote(quote) : null 
      }
    })

    this.quoteService.quoteSubject.subscribe(quote => this.quote = quote)

  }

  ///////////////
  // Functions //
  ///////////////
  public toggleInUpdateMode(): void {
    this.quoteService.setQuote(this.quote)
    this.inUpdateMode === false ? this.inUpdateMode = true : this.inUpdateMode = false
  }

}
