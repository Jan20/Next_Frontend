import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Project } from '../project-model/project'
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from '../../auth/user/user.service';
import { Router } from '@angular/router';
import { MenuService } from '../../menu/menu-service/menu.service';

@Injectable()
export class ProjectService {

  ///////////////
  // Variables //
  ///////////////
  private inAddMode: boolean = false
  private project: Project
  public projectFirestoreDocument: AngularFirestoreDocument<Project>

  //////////////
  // Subjects //
  //////////////
  public inAddModeSubject: Subject<boolean> = new Subject<boolean>()
  public projectSubject: Subject<Project> = new Subject<Project>()

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private menuService: MenuService,
  ) {}

  ///////////////
  // Functions //
  ///////////////
  public toggleInAddMode(): void {
    this.inAddMode = this.inAddMode === false ? true : false
    this.inAddModeSubject.next(this.inAddMode)
  }

  public deleteProject(): void {
    this.projectFirestoreDocument = this.angularFirestore.doc('users/'+ this.userService.getUser().userId +'/projects/' + this.project.id)
    this.projectFirestoreDocument.delete()
    this.router.navigate(['/projects'])
    this.menuService.setMenuFlag(false)
  }

  /////////////
  // Getters //
  /////////////
  public getInAddMode(): boolean {
    return this.inAddMode
  }

  public getProject(): Project {
    return this.project
  }

  /////////////
  // Setters //
  /////////////
  public setProject(project: Project): void {
    this.project = project
    this.projectSubject.next(project)
  }

}
