import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';





@IonicPage()
@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class SpeakersPage {




  isMM: boolean;
  isCC: boolean;
  lname:any;
  fform: FormGroup;

  constructor(public alertCtrl:AlertController, public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider,fb: FormBuilder) {

    this.authProvider.getUserLastName()
    .then(fname => {
      this.lname = fname;

    })
    .catch(error => {
      console.log('OOPS, error', error)
    })


  this.isMM = false;
  this.isCC = false;

  this.fform = fb.group({
    cc: ['', Validators.compose([ Validators.minLength(12)])],
    mm: ['', Validators.compose([ Validators.minLength(10)])]
  });

  }





  switchMM() {
    this.isCC = false;
    this.isMM = true;

  }

  switchCC() {
    this.isMM = false;
    this.isCC= true;

  }


  addPaymentMethod() {
   // this.isCC= true;
    //this.isMM = false;
  }







  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      speaker: item
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakersPage');
  }

  signOut() {
    this.authProvider.signOut();
  }

  validd(){
    if (!this.isMM ) {
      return true ;
    }

    if (!this.isCC ) {
      return true ;
    }


  }


  alerter(){
    let alert = this.alertCtrl.create({
      title: "Validation Error",
      message: "There was an error validating your number, please try again. If problem persists please contact administration",

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }

}
