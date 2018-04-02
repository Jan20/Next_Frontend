import { Component, OnInit, Input } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Time } from "@angular/common"
import { FormControl } from "@angular/forms"
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore"
import { startWith } from "rxjs/operators/startWith"
import { map } from "rxjs/operators/map"
import { TaskService } from "../task-service/task.service";
import { ProjectService } from "../../project/project-service/project.service";
import { Category } from "../../category/category-model/category";
import { Project } from "../../project/project-model/project";
import { Task } from "../task-model/task";
import { UserService } from "../../user/user-service/user.service";

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  @Input() projectId: string

  ///////////////
  // Variables //
  ///////////////
  public title = 'Add Task'
  public filteredFields: Observable<any[]>
  public inAddMode: boolean = false;
  public categories: Category[]
  public categoriesFirestoreCollection: AngularFirestoreCollection<Category>
  public tasksFirestoreCollection: AngularFirestoreCollection<Task>

  // Task
  public task: string = ''
  public targetDurationHours: number
  public targetDurationMinutes: number
  public category: string = ''
  public project: Project = this.projectService.getProject()
  public state: string = 'queued'
  public startTime: Date
  public endTime: Date

  // FormControls
  public taskFormControl: FormControl = new FormControl()
  public targetDurationHoursFormControl: FormControl = new FormControl()
  public targetDurationMinutesFormControl: FormControl = new FormControl()

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private angularFirestore: AngularFirestore,
    private userService: UserService,
    private projectService: ProjectService,
    public taskService: TaskService,

  ) { }

  ngOnInit() {

    this.categoriesFirestoreCollection = this.angularFirestore.collection('users/' + this.userService.getUser().getUserId() + '/categories')
    this.tasksFirestoreCollection = this.angularFirestore.collection('users/' + this.userService.getUser().getUserId() + '/projects/' + this.projectService.getProject().id + '/tasks')

    this.taskService.inAddModeSubject.subscribe( inAddMode => { this.inAddMode = inAddMode; })
    this.projectService.projectSubject.subscribe( project => { this.project = project })
    this.taskFormControl.valueChanges.subscribe(task => { this.task = task })
    this.targetDurationHoursFormControl.valueChanges.subscribe(targetDurationHours => { this.targetDurationHours = targetDurationHours })
    this.targetDurationMinutesFormControl.valueChanges.subscribe(targetDurationMinutes => { this.targetDurationMinutes = targetDurationMinutes })

    this.categoriesFirestoreCollection.valueChanges().subscribe( categories => {

      this.categories = []

      categories.forEach( category => {

        this.categories.push(new Category(category.name, category.colorScheme))

      })

    })

  }

  ///////////////
  // Functions //
  ///////////////
  public addTask(): void {

    this.taskService.toggleInAddMode()

    const data: any = {

      task: this.task,
      category: this.category, 
      project: this.project.name,
      state: 'queued',
      targetDurationHours: this.targetDurationHours,
      targetDurationMinutes: this.targetDurationMinutes,

    }

    this.angularFirestore.collection('users/bihhc6mTKZbZXmJ7Sf9e7mSriQ53/projects/' + this.project.id + '/tasks').add(data)
    this.taskFormControl.reset()
    this.targetDurationHoursFormControl.reset()
    this.targetDurationMinutesFormControl.reset()

    this.tasksFirestoreCollection.snapshotChanges().subscribe( tasks => {
      
      tasks.forEach(task => { 

        this.tasksFirestoreCollection.doc(task.payload.doc.id).update({

          id: task.payload.doc.id

        })
        
      })
    })

  }

  public abortInputDialog(): void {

    this.taskService.toggleInAddMode();

  }

  public addCategory(category: Category): void {

    this.category = category.name

  }

}
