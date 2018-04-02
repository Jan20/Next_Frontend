import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core'
import { Task } from '../task-model/task'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore'
import { MenuService } from '../../menu/menu-service/menu.service'
import { MatSidenavContainer, MatDrawer } from '@angular/material/sidenav'
import { Observable } from 'rxjs/Observable'
import { TaskService } from '../task-service/task.service';
import { ProjectService } from '../../project/project-service/project.service';
import { Project } from '../../project/project-model/project';
import { Time } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user-service/user.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {

  @Input() projectId: string

  ///////////////
  // Variables //
  ///////////////
  public tasksFirestoreCollection: AngularFirestoreCollection<Task>
  public tasks: Task[] = []
  public time: Time

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private projectService: ProjectService,
    private router: Router,
    public taskService: TaskService,
  ) {}

  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      this.tasksFirestoreCollection = this.angularFirestore.collection('users/' + this.userService.getUser().getUserId() + '/projects/' + this.projectService.getProject().id + '/tasks')
    })

    this.tasksFirestoreCollection.valueChanges().subscribe( tasks => {
      this.tasks = []
      tasks.forEach(task => {
        this.tasks.push(new Task(task.id, task.task, task.category, task.project, task.state, task.targetDurationHours, task.targetDurationMinutes))
      })
    })
  }


  ///////////////
  // Functions //
  ///////////////
  public startTask(task: Task): void {
    this.taskService.setTask(task)
    this.router.navigate(['/projects/' + this.projectId + '/tasks/', task.id]);
  }

  public finishTask(task: Task): void {
    if (task.state == 'queued') {
      this.tasksFirestoreCollection.doc(task.id).update({
        state: 'done'
      })
    } else {
      this.tasksFirestoreCollection.doc(task.id).update({
        state: 'queued'
      })
    }
  }

  public hideTask(task: Task): void {
    if (task.state = 'done') {
      this.tasksFirestoreCollection.doc(task.id).update({
        state: 'hidden'
      })
    }
  }

}
