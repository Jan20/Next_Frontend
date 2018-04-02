import { Component, OnInit } from '@angular/core';
import { Task } from '../task-model/task';
import { UserService } from '../../auth/user/user.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../menu/menu-service/menu.service';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public task: Task = new Task('','','','','',0,0)
  public taskDocument: AngularFirestoreDocument<Task>
  private projectId: string
  private taskId: string
  public pastTime: Date = new Date(0)

  //////////////////
  // Constructors //
  //////////////////
  public constructor(

    private router: Router,
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    public menuService: MenuService

  ) {


  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.projectId = params['projectId']
      this.taskId = params['taskId']
      this.taskDocument = this.angularFirestore.doc('users/'+ this.userService.getUser().userId +'/projects/' + this.projectId + '/tasks/' + this.taskId)
      this.taskDocument.valueChanges().subscribe(
        task => {this.task = task
      
        const milliseconds = Math.floor(this.task.targetDurationMinutes*60*1000) + Math.floor(this.task.targetDurationHours*60*60*1000 - 1*60*60*1000)
        this.pastTime = new Date(milliseconds)

      })
    })

    const t = timer(1000, 1000)
        
    const x = t.subscribe(x => {
      let v = this.pastTime.getTime()
      this.pastTime = new Date(v-1000)
    })
  }

  ///////////////
  // Functions //
  ///////////////

  public finishTask(): void {

    this.taskDocument.update({
      state: 'done'
    })
    this.router.navigate(['/projects/' + this.projectId + '/tasks/']);

  }

  
}
