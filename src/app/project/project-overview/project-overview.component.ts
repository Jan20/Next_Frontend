import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { Project } from '../project-model/project'
import { Observable } from 'rxjs/Observable'
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore'
import { MenuService } from '../../menu/menu-service/menu.service'
import { MatDrawer } from '@angular/material/sidenav'
import { ProjectService } from '../project-service/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  public projectsFirestoreCollection: AngularFirestoreCollection<Project> = this.angularFirestore.collection('users/bihhc6mTKZbZXmJ7Sf9e7mSriQ53/projects')
  public projects: Project[]
  public title: string = 'Projects'

  //////////////////
  // Constructors //
  //////////////////
  constructor(
    private angularFirestore: AngularFirestore,
    private menuService: MenuService,
    private router: Router,
    private projectService: ProjectService
  ) {
    this.menuService.setState('project')
  }

  ngOnInit() {
    this.projectsFirestoreCollection.valueChanges().subscribe( projects => {
      this.projects = []
      projects.forEach( project => {
        this.projects.push(new Project(project.id, project.name, project.category, project.state))
      })
    })
  }

  ///////////////
  // Functions //
  ///////////////
  public showDetails(project: Project): void {
    this.router.navigate(['/projects', project.id]);
    this.projectService.setProject(project)
  } 
} 
