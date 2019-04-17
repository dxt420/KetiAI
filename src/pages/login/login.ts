import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupPage } from '../signup/signup';
import { AboutPage } from '../about/about';
import { SpeakersPage } from '../speakers/speakers';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {



  loginForm: FormGroup;
	loginError: string;

  constructor(public navCtrl: NavController, navParams: NavParams,public loadingCtrl: LoadingController,fb: FormBuilder,private auth: AuthProvider) {

    this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});


  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

login() {
  let data = this.loginForm.value;

  if (!data.email) {
    return;
  }

  let credentials = {
    email: data.email,
    password: data.password
  };
  this.auth.signInWithEmail(credentials)
    .then(
      () => this.navCtrl.setRoot(SpeakersPage),
      // error => this.loginError = error.message
      error => this.loginError = "Oops! Your email or password is incorrect, also check that you are connected to the internet, if you are a new user please sign up below"
    );
}

  // ionViewWillEnter(){

  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     showBackdrop: false
  //   });
  //   loading.present()

  //   firebase.auth().onAuthStateChanged( user => {
  //     if (user){
  //       // this.userProfile = user;
  //       // this.isGoogleLoggedIn = true
  //       loading.dismiss()
  //       this.navCtrl.push(TabsPage);
  //     } else {
  //       // this.userProfile = null;
  //       // this.isGoogleLoggedIn = false
  //       loading.dismiss()
  //     }
  //   });

  // }

  // googleLogin(): Promise<any> {
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...',
  //     showBackdrop: false
  //   });
  //   loading.present()

  //   if (this.platform.is('cordova')) {
  //     return this.googlePlus.login({
  //       'webClientId': '160196054863-9gou3v10dff4f22orq99dd136vgjer8l.apps.googleusercontent.com',
  //       'offline': true
  //     }).then( response => {

  //       const googleCredential = firebase.auth.GoogleAuthProvider
  //           .credential(response.idToken);

  //       firebase.auth().signInWithCredential(googleCredential)
  //           .then( success => {

  //             // this.isGoogleLoggedIn = true;
  //             loading.dismiss()
  //           });

  //         }).catch((error) => {
  //           loading.dismiss()
  //           console.error(error)
  //         });
  //   } else{
  //     this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider).then(result => {
  //       if (result) {
  //         // this.isGoogleLoggedIn = true;
  //         loading.dismiss()
  //       }
  //     }).catch(error => {
  //       loading.dismiss()
  //       console.error(error)
  //     })
  //   }
  // }

  // facebookLogin(){
  //   this.authProvider.facebookLogin()
  //     .then(res => {
  //       //We have successfully logged in
  //       //Do something with the response
  //     })
  // }


  // googleLogin(){
  //   this.authProvider.googleLogin()
  //     .then(res => {
  //       //We have successfully logged in
  //       //Do something with the response

  //       // this.navCtrl.push(ItemDetailPage);
  //     })
  // }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
