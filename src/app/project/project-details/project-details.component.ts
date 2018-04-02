import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import { Project } from '../project-model/project';
import { UserService } from '../../user/user-service/user.service';
import { MenuService } from '../../menu/menu-service/menu.service';
import { ProjectService } from '../project-service/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public projectFirestoreDocument: AngularFirestoreDocument<Project>
  public project: Project = new Project('', '', '', '')
  public projectId: string

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private angularFirestore: AngularFirestore,
    private projectService: ProjectService,
    public menuService: MenuService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params['projectId']
      this.projectFirestoreDocument = this.angularFirestore.doc('users/'+ this.userService.getUser().getUserId() +'/projects/' + this.projectId)
    })

    this.projectFirestoreDocument.valueChanges().subscribe( project => {
      this.project = project
      this.projectService.setProject(project)
    })
  }

  ///////////////
  // Functions //
  ///////////////

}
