import { ChatServiceProvider } from './../../providers/chat-service/chat-service';
import { IChat } from './../../models/chatModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {TextToSpeech} from '@ionic-native/text-to-speech';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  chats : IChat[] = [];
  message : string;
  sending : boolean;
  tt: boolean;


  text: string;
  rate: number;
  locale: string;

  constructor(private tts: TextToSpeech,public speechRecognition: SpeechRecognition,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, private _chat : ChatServiceProvider) {
    this.alerter();
    this.text = 'Initial text';
    this.rate = 3;
    this.locale = 'en-US';

    // this.playText("I might need me a vacation");


    console.log('Hello Home');
    speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {

      if (!hasPermission) {
      speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }

   });

  }
  ionViewDidLoad() {
     // subscribe to pusher's event
     this._chat.getChannel().bind('chat', data => {
      if(data.type !== 'bot'){
        data.isMe = true;
      };
      this.chats.push(data);
    });
  }

  playText(ttext) {
    console.log('Yap Mode');

    this.tts.speak({
      text: ttext,
      rate: this.rate / 10,
      locale: this.locale
    })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));

  }



  startVoice() {

    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
        //  this.bgcolor = matches[0];
        this.sendVoiceMessage(matches[0]);
        },
        (onerror) => console.log('error:', onerror)
      )

}

  sendMessage() {
    this.sending = true;
    this._chat.sendMessage(this.message)
      .subscribe(resp => {
        this.message = '';
       // this.sending = false;
      //  this.tt = true;
      //   setTimeout(() => {
      //     console.log('Test');
      //     this.tt = false;
      // }, 2000);
      }, err => {
        console.log(err)
     //   this.sending = false;
      } );
  }

  sendMessageX(aa) {
    this.sending = true;
    this._chat.sendMessage(aa)
      .subscribe(resp => {
        this.message = '';
        this.sending = false;
        this.tt = true;
        setTimeout(() => {
          console.log('Test');
          this.tt = false;
      }, 2000);
      }, err => {
        this.sending = false;
      } );
  }

  sendVoiceMessage(message) {
    this.sending = true;
    this._chat.sendMessage(message)
      .subscribe(resp => {

        this.message = '';
        this.sending = false;
        this.tt = true;
        setTimeout(() => {
          console.log('Test');
          this.tt = false;
      }, 2000);
      }, err => {
        this.sending = false;
      } );
  }



  alerter(){
    let alert = this.alertCtrl.create({
      title: "About Privacy",
      message: "By using this app, you agree to share all your personal related information. Please feel safe as you're information will not be shared with anyone else" ,

      buttons: [
        {
          text: 'I Agree, Continue',
          role: 'cancel'
        }
      ]
    });

    alert.present();
  }
}
