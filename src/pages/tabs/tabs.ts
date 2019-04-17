import { Component, ViewChild } from '@angular/core';

import { IonicPage, NavController, NavParams, App, Tabs } from 'ionic-angular';
import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root, Tab6Root, Tab7Root, Tab8Root, Tab9Root, Tab10Root, Tab11Root, Tab12Root } from '../';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
// @ViewChild('myTabs') tabRef: Tabs;

export class TabsPage {

  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;
  tab3Root: any = Tab3Root;
  tab4Root: any = Tab4Root;
  tab5Root: any = Tab5Root;
  tab6Root: any = Tab6Root;
  tab7Root: any = Tab7Root;
  tab8Root: any = Tab8Root;
  tab9Root: any = Tab9Root;
  tab10Root: any = Tab10Root;
  tab11Root: any = Tab11Root;
  tab12Root: any = Tab12Root;

  private selected: number;


  selectedIndex;
  notificationCount = 0;
  nData;
  color: string = "secondary";
  nData2: any;
  constructor( public navParams: NavParams,public navCtrl: NavController, public app: App,private auth: AuthProvider,) {
    // this.selectedIndex = 0;
    // if (navParams.data.index) {
    //   this.selectedIndex = navParams.data.index;
    // }


    // this.selectedIndex = navParams.data.index || 0;

    this.selected = this.navParams.get('selectedTab') || 0;



    console.log(this.navParams.get('aa'));
    // console.log(this.selectedIndex);

    // if (navParams.get('aa')=="aa") {
    //   // TabsPage.notificationCount++;
    //   this.fromNotification();
    //   console.log(navParams.get('nData'));
    //   this.nData = navParams.get('nData');
    //   // navParams.data.aaa = navParams.get('nData')
    //   console.log(this.nData.body);
    //   this.newNotes1();
      
    // }

    // if (navParams.get('aa')=="bb") {
    //   // TabsPage.notificationCount++;
    //   this.fromNotification();
    //   console.log(navParams.get('nData'));
    //   this.nData2 = navParams.get('nData');
    //   // navParams.data.aaa = navParams.get('nData')
    //   console.log(this.nData.body);
    //   this.newNotes2();
      
    // }
    
  }

  newNotes1() {
		
		let credentials = {
			// title: this.nData.title,
			body: this.nData.body
		
		};
		this.auth.newNotification(credentials);
}
newNotes2() {
		
  let credentials = {
    title: this.nData2.title,
    body: this.nData2.body
  
  };
  this.auth.newNotification(credentials);
}


//   newNotes() {
		
// 		let credentials = {
// 			title: this.nData.title,
// 			body: this.nData.body,
// 			time: this.convertMillisecondsToDigitalClock(this.nData.google.sent_time)
		
// 		};
// 		this.auth.newNotification(credentials);
// }


convertMillisecondsToDigitalClock(ms) {
  var hours = Math.floor(ms / 3600000) // 1 Hour = 36000 Milliseconds
  var minutes = Math.floor((ms % 3600000) / 60000) // 1 Minutes = 60000 Milliseconds
  var seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
      return {
      hours : hours,
      minutes : minutes,
      seconds : seconds,
      clock : hours + ":" + minutes + ":" + seconds
  };
}

  

  ionViewWillEnter() {
    if(this.selected) {
      this.tabRef.select(this.selected);
    }
   }

  ionViewDidEnter() {
    // this.tabRef.select(docId);
   }

  fromNotification(){
    // this.app.getRootNav().setRoot(NotifyPage);
    this.selectedIndex = 4;
  }

  selectedTab(){
    this.color ="primary";
  }
}
