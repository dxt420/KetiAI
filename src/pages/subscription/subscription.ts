import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Rave, RavePayment, Misc } from 'rave-ionic3';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx'

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {

  oneDay: string = "1 day";
  oneDayPrice: string = "1000";


  sevenDay: string = "7 days";
  sevenDayPrice: string = "7000";


  thirtyDay: string = "30 days";
  thirtyDayPrice: string = "30000";

  email: any;

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider,private rave: Rave,
    private ravePayment: RavePayment,
    private misc: Misc,
    private iab: InAppBrowser) {

    this.email = this.authProvider.getEmail();



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
  }

  openPage(b,c) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(a.component);

    // this.navCtrl.push('SubscriptiondetailsPage',{
    //   "period" : b,
    //   "price" : c
    // });

  }



  pay(amount){
    this.rave.init(true, "FLWPUBK-4e734ea929fdf67fbe0c904c9ff3952e-X")
      .then(_ => {
        var paymentObject = this.ravePayment.create({
          customer_email: this.email,
          amount: 2,
          customer_phone: "+256770563420",
          currency: "USD",
          txref: "Keti-" + new Date(),
          meta: [{
              metaname: "Keti",
              metavalue: "KetiAI"
          }]

      })
        this.rave.preRender(paymentObject)
          .then(secure_link => {
            secure_link = secure_link +" ";
            const browser: InAppBrowserObject = this.rave.render(secure_link, this.iab);
            browser.on("loadstop")
                .subscribe((event: InAppBrowserEvent) => {
                  if(event.url.indexOf('') != -1) {
                    if(this.rave.paymentStatus(event.url) == 'failed') {
                      this.alertCtrl.create({
                        title: "Message",
                        message: "Oops! Transaction failed"
                      }).present();
                    }else {
                      this.alertCtrl.create({
                        title: "Message",
                        message: "Transaction successful"
                      }).present();
                    }
                    browser.close()
                  }
                })
          }).catch(error => {
            // Error or invalid paymentObject passed in
            //
          })
      })
}




}
