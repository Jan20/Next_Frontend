import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { UserService } from '../../user/user-service/user.service'
import { CategoryService } from '../category-service/category.service'
import { Category } from '../category-model/category'

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Add Category'
  public inAddMode: boolean = false
  public categoriesCollection: AngularFirestoreCollection<Category> = this.angularFirestore.collection('users/' + this.userService.getUser().getUserId() + '/categories')
  public categories: Category[]

  // Category
  public name: string = ''
  public category: Category
  public colorScheme: string

  // FormControls
  public nameFormControl: FormControl = new FormControl()
  public colorSchemeFormControl: FormControl = new FormControl()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    public categoryService: CategoryService

  ) { }

  ngOnInit() {

    this.nameFormControl.valueChanges.subscribe(name => { this.name = name })
    this.colorSchemeFormControl.valueChanges.subscribe(colorScheme => { this.colorScheme = colorScheme })

    this.categoryService.inAddModeSubject.subscribe( inAddMode => {

      this.inAddMode = inAddMode

    })

    this.categoriesCollection.valueChanges().subscribe( categories => {

      this.categories = []

      categories.forEach( category => {

        this.categories.push(new Category(category.name, category.colorScheme))

      })

    })

  }

  ///////////////
  // Functions //
  ///////////////
  public addCategory(): void {

    this.categoryService.toggleInAddMode()

    const category: any = {

      name: this.name,

    }

    this.angularFirestore.collection('users/bihhc6mTKZbZXmJ7Sf9e7mSriQ53/categories').add(category)

    this.nameFormControl.reset()

  }

  public abortInputDialog(): void {

    this.categoryService.toggleInAddMode()

  }

}

