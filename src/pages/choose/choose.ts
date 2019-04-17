import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ChoosePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
})
export class ChoosePage {

  lname:any;
  constructor(public authProvider: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.authProvider.getUserLastName()
    .then(fname => {
      this.lname = fname;

    })
    .catch(error => {
      console.log('OOPS, error', error)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
  }



  openItem(page: string) {
    this.navCtrl.push(page.toString());
  }

}
