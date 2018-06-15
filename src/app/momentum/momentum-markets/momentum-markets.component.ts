import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-momentum-markets',
  templateUrl: './momentum-markets.component.html',
  styleUrls: ['./momentum-markets.component.scss']
})
export class MomentumMarketsComponent implements OnInit {

  ///////////////
  // Variables //
  ///////////////
  private languageId: string
  private stageId: string
  private topicId: string
  private flag: boolean

  /////////////////
  // Constructor //
  /////////////////
  public constructor(


  ) {}
    
  ///////////////////////
  // On Initialization //
  ///////////////////////
  ngOnInit() {

    this.flag = false

    // this.activatedRoute.params.subscribe(params => {

    //   this.languageId = params['languageId']
    //   this.stageId = params['stageId']
    //   this.topicId = params['topicId']

    //   this.entryService.fetchEntries(this.languageId, this.stageId, this.topicId)

    // })

    // this.entryService.entriesSubject.subscribe(entries => {
    
    //   this.entries = entries
    //   this.entry = this.entries[0]

    // })
  }

  ////////////////////
  // Event Handlers //
  ////////////////////
  public onKey(event: any) { 

    this.toggleFlag()
  
  }
  
  ///////////////
  // Functions //
  ///////////////
  // public selectEntry(entry: Entry): void {

  //   this.router.navigate([`/languages/${this.languageId}/stages/${this.stageId}/topics/${this.topicId}/entries/${entry.entryId}`])
  //   this.entryService.setEntry(entry)
  //   this.entryService.selectSubject.next(true)

  // }

  public toggleFlag(): void {

    this.flag ? this.flag = false : this.flag = true
    
  }

}
