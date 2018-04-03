import { Component, OnInit } from '@angular/core'
import { MenuService } from '../menu-service/menu.service'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
// Models
import { Quote } from '../../quote/quote-model/quote'
// Services
import { UserService } from '../../user/user-service/user.service'
import { QuoteService } from '../../quote/quote-service/quote.service'

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss']
})
export class MenuSidenavComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public state: string = 'default'
  public quotes: Quote[]
  public quote: Quote
  public quoteCollection: AngularFirestoreCollection<Quote>

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    public menuService: MenuService,
    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private quoteService: QuoteService,
  ) {}

  ngOnInit() {
    this.menuService.stateSubject.subscribe(state => this.state = state)
    this.quoteService.quoteSubject.subscribe(quote => this.quote = quote)

    this.userService.userSubject.subscribe( user => {
      this.quoteCollection = this.angularFirestore.collection('/users/'+ user.getUserId() + '/quotes')
      this.quoteCollection.valueChanges().subscribe(quotes => {
        this.quotes = []
        quotes.forEach( quote => { this.quotes.push(new Quote(quote.id, quote.author, quote.category, quote.quote, quote.score)) })
      })
    })

  }

  ///////////////
  // Functions //
  ///////////////

  /////////////////////////////
  // Quote-related Functions //
  /////////////////////////////
  public viewPreviewsQuote(): void {
    for (let i = 0; i < this.quotes.length; i++){
      if(this.quotes[i].id === this.quote.id && this.quotes[i-1] != undefined) {
        this.quoteService.setQuote(this.quotes[i-1])
        return
      }
    }
  }

  public viewNextQuote(): void {
    for (let i = 0; i < this.quotes.length; i++){
      if(this.quotes[i].id === this.quote.id && this.quotes[i+1] != undefined) {
        this.quoteService.setQuote(this.quotes[i+1])
        return
      }
    }
  }

  public changeQuote(): void {
    this.quoteService.toggleInUpdateMode()
  }

  ///////////////////////////////
  // Project-related Functions //
  ///////////////////////////////

}
