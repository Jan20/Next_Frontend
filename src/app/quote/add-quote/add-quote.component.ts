import { Component, OnInit } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { FormControl } from '@angular/forms'

// Services
import { UserService } from '../../user/user-service/user.service'

// Models
import { Quote } from '../quote-model/quote'
import { Category } from '../../category/category-model/category';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.scss']
})
export class AddQuoteComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title: string = 'Add Quote'
  public inAddMode: boolean = false
  public quote: string = ''
  public author: string = ''
  public categories: Category[]
  public category: Category
  
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
    private userService: UserService

  ) { }

  ngOnInit() {

    this.quoteFormControl.valueChanges.subscribe( quote => { this.quote = quote })
    this.authorFormControl.valueChanges.subscribe( author => { this.author = author })

    this.categoriesCollection.valueChanges().subscribe( categories => {
      this.categories = []
      categories.forEach(category => { this.categories.push( new Category(category.name, category.colorScheme))
      })
    })

    this.quotesCollection.snapshotChanges().subscribe( quotes => {
      quotes.forEach(quote => { this.quotesCollection.doc(quote.payload.doc.id).update({ id: quote.payload.doc.id }) })
    })

  }

  ///////////////
  // Functions //
  ///////////////
  public addQuote(): void {
    this.toggleInAddMode()
    const data: any = {
      category: this.category.name,
      quote: this.quote, 
      author: this.author,
      score: 0
    }
    this.angularFirestore.collection('users/'+ this.userService.getUser().getUserId() +'/quotes').add(data)

    this.quoteFormControl.reset()
    this.authorFormControl.reset()
  }

  public toggleInAddMode() {
    this.inAddMode = this.inAddMode == true ? false : true
  }

  public addCategory(category: Category): void {
    this.category = category
  }

}
