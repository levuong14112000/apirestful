import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestErrorComponent } from './test-error.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { Router, RouterModule } from '@angular/router';
import { TestErrorRountes } from './test-error.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TestErrorComponent,
    ServerErrorComponent,
    NotFoundComponent
 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TestErrorRountes),
    SharedModule
  ]
})
export class TestErrorModule {

    
  }
 
