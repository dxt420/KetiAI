import { ChatServiceProvider } from './../../providers/chat-service/chat-service';
import { IChat } from './../../models/chatModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  chats : IChat[] = [];
  message : string;
  sending : boolean;

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, private _chat : ChatServiceProvider) {
    this.alerter();
    console.log('Hello Home');
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
  sendMessage() {
    this.sending = true;
    this._chat.sendMessage(this.message)
      .subscribe(resp => {
        this.message = '';
        this.sending = false;
      }, err => {
        this.sending = false;
      } );
  }

  sendMessageX() {

    this._chat.sendMessage("hello")
      .subscribe(resp => {
        this.message = '';

      }, err => {

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
