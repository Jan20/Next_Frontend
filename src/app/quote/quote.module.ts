import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';


// Components
import { QuoteOverviewComponent } from './quote-overview/quote-overview.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { QuoteUpdateComponent } from './quote-update/quote-update.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';

// Services
import { QuoteService } from './quote-service/quote.service';


@NgModule({
  imports: [
    
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,  
    MatAutocompleteModule,
    FormsModule,
    
  ],
  declarations: [

    QuoteOverviewComponent,
    AddQuoteComponent,
    QuoteUpdateComponent,
    QuoteDetailsComponent,

  ],
  providers: [

    QuoteService,

  ],
  exports: [


  ]
})
export class QuoteModule { }
