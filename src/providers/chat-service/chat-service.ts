import { PusherServiceProvider } from './../pusher-service/pusher-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ChatServiceProvider {

  // private _url = 'http://localhost:5000';
  // private _url = 'https://keti-server.herokuapp.com/';
  private _url = 'https://keti-server-v2.herokuapp.com';




  private _channel : any;
  constructor(public http: HttpClient, private _pusher : PusherServiceProvider) {
    this._channel = this._pusher.getPusher().subscribe('chat-bot');
  }


  sendMessage( message : string) : Observable<any>{
    const param = {
      type: 'human',
      message,
    };
    var headerDict = {

      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'POST',
      'Authorization': 'Bearer 203aff72bf9942ea8bbea2a1d47166b1',
      'rejectUnauthorized': 'false'
    };

    var requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    // i think putting a sleep here and gif loader is perfect
    // i think putting a sleep here and gif loader is perfect
    // i think putting a sleep here and gif loader is perfect
    // i think putting a sleep here and gif loader is perfect
    // i think putting a sleep here and gif loader is perfect
    return this.http.post(`${this._url}/message`, param)
  }
  getChannel(){
    return this._channel;
  }
}
