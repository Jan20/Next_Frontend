import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Task } from '../task-model/task';

@Injectable()
export class TaskService {

  ///////////////
  // Variables //
  ///////////////
  private task: Task  
  private inAddMode: boolean = false
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  public taskSubject: Subject<Task> = new Subject<Task>()

  //////////////////
  // Constructors //
  //////////////////
  constructor() { }

  ///////////////
  // Functions //
  ///////////////
  public toggleInAddMode(): void {

    this.inAddMode = this.inAddMode === false ? true : false
    this.inAddModeSubject.next(this.inAddMode)

  }

  /////////////
  // Getters //
  /////////////
  public getInAddMode(): boolean {
    return this.inAddMode
  }

  public getTask(): Task {
    return this.task
  }

  /////////////
  // Setters //
  /////////////
  public setTask(task: Task): void {
    this.task = task
    this.taskSubject.next(task)
  }



}
