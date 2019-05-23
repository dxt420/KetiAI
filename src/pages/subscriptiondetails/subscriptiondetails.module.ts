import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptiondetailsPage } from './subscriptiondetails';

@NgModule({
  declarations: [
    SubscriptiondetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptiondetailsPage),
  ],
})
export class SubscriptiondetailsPageModule {}
