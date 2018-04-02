import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { FormControl } from '@angular/forms'

// Services
import { UserService } from '../../user/user-service/user.service'

// Models
import { Quote } from '../quote-model/quote'
import { Category } from '../../category/category-model/category';
import { QuoteService } from '../quote-service/quote.service';
import { MenuService } from '../../menu/menu-service/menu.service';

@Component({
  selector: 'app-quote-update',
  templateUrl: './quote-update.component.html',
  styleUrls: ['./quote-update.component.scss']
})
export class QuoteUpdateComponent implements OnInit {
 
  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Update Quote'
  public quote: string = ''
  public author: string = ''
  public categories: Category[]
  public category: Category
  private currentQuote: Quote
  
  // Forms
  public quoteFormControl: FormControl = new FormControl()
  public authorFormControl: FormControl = new FormControl()

  // Firestore
  private categoriesCollection: AngularFirestoreCollection<Category> = this.angularFirestore.collection('users/'+ this.userService.getUser().getUserId() +'/categories')
  private quotesCollection: AngularFirestoreCollection<Quote> = this.angularFirestore.collection('users/'+ this.userService.getUser().getUserId() +'/quotes')

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    public quoteService: QuoteService,
    public menuService: MenuService

  ) { }

  ngOnInit() {
    this.quoteFormControl.valueChanges.subscribe( quote => { this.quote = quote })
    this.authorFormControl.valueChanges.subscribe( author => { this.author = author })

    this.quoteService.quoteSubject.subscribe(quote => {
      this.currentQuote = quote
      this.quoteFormControl.setValue(quote.quote)
      this.authorFormControl.setValue(quote.author)
      this.category = new Category(quote.category,'none')
    })

    this.categoriesCollection.valueChanges().subscribe( categories => {
      this.categories = []
      categories.forEach(category => { this.categories.push( new Category(category.name, category.colorScheme))
      })
    })
  }

  ///////////////
  // Functions //
  ///////////////
  public updateQuote(): void {

    this.quoteService.toggleInUpdateMode()

    const data: any = {
      category: this.category.name,
      quote: this.quote, 
      author: this.author,
      score: 0
    }

    this.angularFirestore.doc('users/'+ this.userService.getUser().getUserId() +'/quotes/' + this.quoteService.getQuote().id).update(data)

    this.quoteFormControl.reset()
    this.authorFormControl.reset()

  }

  public deleteQuote(): void {
    this.angularFirestore.doc('users/'+ this.userService.getUser().getUserId() +'/quotes/' + this.quoteService.getQuote().id).delete()
  }

  public addCategory(category: Category): void {
    this.category = category
  }

}
