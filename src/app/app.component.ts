
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform, ToastController, AlertController } from 'ionic-angular';

import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from '../providers/auth/auth';
import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { IntroPage } from '../pages/intro/intro';

import { HomePage } from '../pages/home/home';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http,Headers,RequestOptions } from '@angular/http'
import firebase from 'firebase';
// import { HTTP } from '@ionic-native/http/ngx';




@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
      <ion-toolbar>
        <ion-title  text-center>

        <img style="height: 40px;" [src]="'assets/img/logo.png'">



      </ion-title>
        <ion-buttons end>
        <button style="color:white" menuClose ion-button >
                <ion-icon  name="close"></ion-icon>
              </button>
        </ion-buttons>



      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list no-lines >

        <ion-item style="background-color: rgba(0, 0, 0, 0);" *ngFor="let p of pages" menuClose (click)="openPage(p)">
          <ion-icon [name]="p.icon" item-left></ion-icon>
          {{ p.title }}
        </ion-item>




      </ion-list>


      <button  menuClose ion-button  round block medium (click)="signOut()" style="Width:50%;margin-left:25%;background-color: red; margin-top:60vh">

				Sign Out
				</button>








    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`

})
export class MyApp {
  rootPage: any;

  pages: Array<{ title: string, component: any, icon: string }>;

  @ViewChild(Nav) nav: Nav;


  constructor(public http: HttpClient, public platform: Platform, private statusBar: StatusBar, public fcm: FcmProvider, public toastCtrl: ToastController, private splashScreen: SplashScreen, private auth: AuthProvider, public alertCtrl: AlertController) {

    this.initializeApp();

    this.pages = [

      { title: 'Subscription', component: 'SubscriptiondetailsPage', icon: "cash" },
      { title: 'Guidelines', component: 'GuidelinesPage', icon: "list" },
      { title: 'About', component: 'AboutPage', icon: "information" },


    ]

  }

  initializeApp() {
    this.platform.ready().then(() => {


      this.statusBar.styleDefault();
      // this.splashScreen.show();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 300);
    });

    // this.auth.getUserCompany()
    // .then(fname => {
    //   console.log(fname)
    // })
    // .catch(error => {
    //   console.log('OOPS, error', error)
    // })

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user && user.emailVerified) {


              console.log(user.emailVerified)
              firebase.auth().currentUser.getIdToken()
              .then(authToken => {



                var headerDict = {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                  'Authorization': 'Bearer ' + authToken
                };

                var requestOptions = {
                  headers: new HttpHeaders(headerDict)
                };

                console.log(authToken)



                return this.http.post('https://keti-server-v2.herokuapp.com/getUser',{}, requestOptions).toPromise()


              })
              .catch(error => {
                console.log('OOPS, error', error)
              })

            this.rootPage = HomePage;
          } else if (user && !user.emailVerified) {
            alert('Please verify your email address to gain access');
            this.rootPage = LoginPage;
            console.log("Like For Verify")
          } else {
            this.rootPage = IntroPage;
            console.log("Like For Intro")
          }
        },
        () => {
          this.rootPage = LoginPage;
          console.log("Like For XXX")
        }
      );

    // Get a FCM token
    this.fcm.firebaseNative.getToken().then(token => {
      console.log(token);
    })






    this.fcm.firebaseNative.subscribe('all');
    // Listen to incoming messages
    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        // show a toast
        let messageText: string;
        if (this.platform.is('android')) {
          messageText = msg.body;

        }

        if (this.platform.is('ios')) {
          messageText = msg.aps.alert;
        }

        let alert = this.alertCtrl.create({
          title: msg.title,
          message: messageText,
          buttons: [
            {
              text: 'Done',
              role: 'cancel'
            }
          ]
        });

        alert.present();
        // const toast = this.toastCtrl.create({
        //   message: messageText,
        //   duration: 3000
        // });
        // toast.present();
      })
    )
      .subscribe()




    this.fcm.firebaseNative.onTokenRefresh().subscribe(token => {
      console.log(token);
    });











  }





  openPage(a) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(a.component);

    this.nav.push(a.component.toString());

  }

  signOut() {
    this.auth.signOut();
  }


}
