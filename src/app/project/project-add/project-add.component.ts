import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { ProjectService } from '../project-service/project.service'
import { Category } from '../../category/category-model/category'
import { CategoryService } from '../../category/category-service/category.service'
import { Project } from '../project-model/project'
import { UserService } from '../../auth/user/user.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class ProjectAddComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public title = 'Add Project'
  public inAddMode: boolean = false
  public categoriesCollection: AngularFirestoreCollection<Category> = this.angularFirestore.collection('users/bihhc6mTKZbZXmJ7Sf9e7mSriQ53/categories')
  public categories: Category[]
  public projectFirestoreCollection: AngularFirestoreCollection<Project>
  public projectFirestoreDocument: AngularFirestoreDocument<Project>
  public projectFirestoreCollectionReference: any

  // Category
  public name: string = ''
  public colorScheme: string = ''
  public category: Category

  // FormControls
  public nameFormControl: FormControl = new FormControl()
  public colorSchemeFormControl: FormControl = new FormControl()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    public projectService: ProjectService,
    public categoryService: CategoryService

  ) { }

  ngOnInit() {

    this.categoryService.inAddModeSubject.subscribe( inAddMode => {

      this.inAddMode = inAddMode

    })

    this.categoriesCollection.valueChanges().subscribe( categories => {

      this.categories = []

      categories.forEach( category => {

        this.categories.push(new Category(category.name, category.colorScheme))

      })

    })

    this.nameFormControl.valueChanges.subscribe(name => { this.name = name })
    this.colorSchemeFormControl.valueChanges.subscribe(colorScheme => { this.colorScheme = colorScheme })

  }

  ///////////////
  // Functions //
  ///////////////
  public addProject(): void {

    this.projectFirestoreCollection = this.angularFirestore.collection('users/' + this.userService.getUser().userId + '/projects')

    this.projectService.toggleInAddMode()

    const project: any = {

      name: this.name,
      category: this.category.name,
      state: 'queued',

    }

    this.projectFirestoreCollection.add(project)
    
    this.projectFirestoreCollection.valueChanges().subscribe( projects => {
      projects.forEach(project => { 
        
        this.projectFirestoreCollection.ref.where('name', '==', project.name).get().then( projectsA => {
          projectsA.docs.forEach(projectA => {

            this.projectFirestoreCollection.doc(projectA.id).update({
              
              id: projectA.id

            })  
          })
        })
      })
    })
  
    this.nameFormControl.reset()

  }

  public abortInputDialog(): void {

    this.projectService.toggleInAddMode()

  }

  public addCategory(category: Category): void {

    this.category = category

  }

}