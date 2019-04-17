import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakersPage } from './speakers';
// import { PipesModule } from '../../pipes/pipes.module';
// import { SearchPipe } from '../../pipes/search/search';

@NgModule({
  declarations: [
    SpeakersPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeakersPage),
    // PipesModule.forRoot()
  ],
  exports: [
    SpeakersPage
  ]

})
export class SpeakersPageModule {}
