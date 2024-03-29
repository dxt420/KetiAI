import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform } from 'ionic-angular';
import { AuthProvider } from '../auth/auth';
import {InAppPurchase} from "in-app-purchase";

/*
  Generated class for the SubscriptionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubscriptionProvider {

  // product_id;
  // inTrial;
  // cashPay;
  // subscriber;
  // get isPaying() {
  //   if(this.inTrial){
  //     return true;
  //   } else {
  //     return this.cashPay || this.subscriber;
  //   }
  // }

  receipt;


  constructor(
    private alertCtrl: AlertController,
    private auth: AuthProvider,
    private toastCtrl: ToastController,
    private iap: InAppPurchase,
    private platform: Platform) {

    console.log('Hello SubscriptionProvider Provider');



    this.receipt = {
      "userId": "I3HL7XppEMhrOGDnur9-ulvqomrSg6qyODKmah76IJU=",
      "receiptId": "HYSD-420THC"
    }

    iap.config({

      /* Configurations for HTTP request */
      requestDefaults: {
        /* Please refer to the request module documentation here: https://www.npmjs.com/package/request#requestoptions-callback */
      },

      /* Configurations for Amazon Store */
      amazonAPIVersion: 2, // tells the module to use API version 2
      secret: 'almightycoder', // this comes from Amazon
      amazonValidationHost: 'http://localhost:8080/RVSSandbox', // Local sandbox URL for testing amazon sandbox receipts.

      /* Configurations for Apple */
     // appleExcludeOldTransactions: true, // if you want to exclude old transaction, set this to true. Default is false
     // applePassword: 'abcdefg...', // this comes from iTunes Connect (You need this to valiate subscriptions)

      /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
      // googleServiceAccount: {
      //     clientEmail: '<client email from Google API service account JSON key file>',
      //     privateKey: '<private key string from Google API service account JSON key file>'
      // },

      /* Configurations for Google Play */
      // googlePublicKeyPath: 'path/to/public/key/directory/', // this is the path to the directory containing iap-sanbox/iap-live files
      // googlePublicKeyStrSandBox: 'publicKeySandboxString', // this is the google iap-sandbox public key string
      // googlePublicKeyStrLive: 'publicKeyLiveString', // this is the google iap-live public key string
      // googleAccToken: 'abcdef...', // optional, for Google Play subscriptions
      // googleRefToken: 'dddd...', // optional, for Google Play subscritions
      // googleClientID: 'aaaa', // optional, for Google Play subscriptions
      // googleClientSecret: 'bbbb', // optional, for Google Play subscriptions

      // /* Configurations for Roku */
      // rokuApiKey: 'aaaa...', // this comes from Roku Developer Dashboard

      /* Configurations all platforms */
      test: true, // For Apple and Googl Play to force Sandbox validation only
      verbose: true // Output debug logs to stdout stream
  });
  iap.setup()
    .then(() => {
      // iap.validate(...) automatically detects what type of receipt you are trying to validate
      iap.validate(this.receipt).then(this.onSuccess).catch(this.onError);
    })
    .catch((error) => {
      // error...
    });
  }


   onSuccess(validatedData) {
    // validatedData: the actual content of the validated receipt
    // validatedData also contains the original receipt
    var options = {
        ignoreCanceled: true, // Apple ONLY (for now...): purchaseData will NOT contain cancceled items
        ignoreExpired: true // purchaseData will NOT contain exipired subscription items
    };
    // validatedData contains sandbox: true/false for Apple and Amazon
    var purchaseData = this.iap.getPurchaseData(validatedData, options);
}

 onError(error) {
    // failed to validate the receipt...
}


}
