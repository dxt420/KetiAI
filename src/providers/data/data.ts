// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { GoldSponsor, SilverSponsor, PlatinumSponsor, Exhibitor, Wifi, Speaker, Social, About, Attendee, Schedule, Post, Notification, Rules } from '../../models/sponsorGold';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Platform } from 'ionic-angular';
import { AuthProvider } from '../auth/auth';

// import { HTTP } from '@ionic-native/http/ngx';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {


  // profileData:any;
  public goldSponsorsListRef = this.db.list<GoldSponsor>('sponsors/gold');
  public silverSponsorsListRef = this.db.list<SilverSponsor>('sponsors/silver');
  public platinumSponsorsListRef = this.db.list<PlatinumSponsor>('sponsors/platinum');

  public attendeeListRef = this.db.list<Attendee>('users');

  public scheduleListRef = this.db.list<Schedule>('schedule');

  public scheduledSpeakersListRef = this.db.list<Speaker>('speakers');


  public speakersListRef = this.db.list<Speaker>('speakers');

  


  public exhibitorsListRef = this.db.list<Exhibitor>('exhibitors');

  public mapListRef = this.db.object('map');

  public wifiListRef = this.db.list<Wifi>('wifi');

  public socialListRef = this.db.list<Social>('social');

  public aboutListRef = this.db.list<About>('about');

  public postsListRef = this.db.list<Post>('posts');

  public rulesListRef = this.db.list<Rules>('pitchrules');

  public applyListRef = this.db.list<Rules>('pitchapply');

  public guideListRef = this.db.list<Rules>('pitchguide');

  ;

  public badger;
  

  public notesListRef = this.db.list<Notification>(`users/${this.userId}/notifications`);

  userId = this.auth.user.uid;;

   headerDict = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAKjiVgAAAAAAH3XGlo%2B4usYi8aI%2B7SHcSsdI%2BO4%3Dkyuwv4q9JHpTNnGscjsRfa0IqHJTcktvcjsmPWv7cBnyZgOtzn'
  };

  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict)
  };

  constructor(public platform: Platform,private db: AngularFireDatabase,private http: HttpClient,public auth:AuthProvider) { }


  // getTweetsList() {
  //   if (this.platform.is('android') || this.platform.is('ios')) {

  //     this.HttpNativeProvider.get('https://api.twitter.com/1.1/search/tweets.json?q=%23LegalTechConference19&src=typd', {}, { "Content-Type": "application/json" })
  //       .then(data => {
  //         var dataReturn = JSON.parse(data.data);
  //         console.log(dataReturn.data);
  //       })
  //       .catch(error => {

  //       });
  //   } else {
  //     this.HttpAngularProvider.get('https://api.twitter.com/1.1/search/tweets.json?q=%23LegalTechConference19&src=typd', this.requestOptions).map(res => res.json()).subscribe(data => {
  //       console.log(data.data);

  //     }, error => {

  //     });
  //   }
  // }
 

  getAllNotes(){
    return this.notesListRef;
  }

  getTweetsList() {
    return this.http.get('https://api.twitter.com/1.1/search/tweets.json?q=%23LegalTechConference19&src=typd&tweet_mode=extended&count=100', this.requestOptions).map(res => res);
    // return this.http.get('https://api.twitter.com/1.1/statuses/user_timeline.json?q=%23LegalTechConference19&src=typd&tweet_mode=extended?screen_name=LegalTechUganda', this.requestOptions).map(res => res);

     
}


// getTweetsList() {
//   return this.http.get('http://www.json-generator.com/api/json/get/bUYtuKGPoy?indent=2').map(res => res);
  
// }



  
getRulesList() {
  return this.rulesListRef;
}

getApplyList() {
  return this.applyListRef;
}

getGuideList() {
  return this.guideListRef;
}


  getPostsList() {
    return this.postsListRef;
}



  getScheduleList() {
    return this.scheduleListRef;
}



  getAttendeeList() {
    return this.attendeeListRef;
}

  getGoldSponsorList() {
    return this.goldSponsorsListRef;
}

  getPlatinumSponsorList() {
  return this.platinumSponsorsListRef;
}

  getSilverSponsorList() {
  return this.silverSponsorsListRef;
}

getSpeakersList() {
  return this.speakersListRef;
}

getExhibitorsList() {
  return this.exhibitorsListRef;
}

getMapList() {
  return this.mapListRef;
}

getWifiList() {
  return this.wifiListRef;
}
getSocialList() {
  return this.socialListRef;
}
getAboutList() {
  return this.aboutListRef;
}

}
