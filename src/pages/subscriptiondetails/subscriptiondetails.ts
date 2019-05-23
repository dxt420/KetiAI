import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Rave, RavePayment, Misc } from 'rave-ionic3';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx'
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SubscriptiondetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscriptiondetails',
  templateUrl: 'subscriptiondetails.html',
})
export class SubscriptiondetailsPage {

  payForm: FormGroup;


  price: any;
  period: any;

  abc: string = "feed";

  pages: string = "pageA";
  email: any;


  constructor(public alertCtrl:AlertController,public navCtrl: NavController,fb: FormBuilder, public navParams: NavParams,public authProvider: AuthProvider,private rave: Rave,
    private ravePayment: RavePayment,
    private misc: Misc,
    private iab: InAppBrowser) {


    this.email = this.authProvider.getEmail();
    //this.price = navParams.get('price');
    //this.period = navParams.get('period');

    this.payForm = fb.group({
			tele: ['', Validators.compose([Validators.required])]
		});
  }

  payy(){

    let data = this.payForm.value;

    let info = {
      tele: data.tele
    };

    this.rave.init(true, "FLWPUBK-409ee387c7d46b6e442b3dafdee7432b-X")
      .then(_ => {
        var paymentObject = this.ravePayment.create({
          customer_email: this.email,
          amount: 7000,
          customer_phone: data.tele,
          currency: "UGX",
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptiondetailsPage');
  }

  swipeEvent($e) {
    console.log($e.deltaX+", "+$e.deltaY);
    if($e.deltaX > 0){
      console.log("Swipe from Lefty to Righty");
      this.pages = "pageB";
    }else{
      console.log("Swipe from Right to Left");
      this.pages = "pageA";
    }
}

}
