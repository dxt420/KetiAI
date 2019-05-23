
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';



/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public user: firebase.User;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
    afAuth.authState.subscribe(user => {
      if(user){
        console.log(user)
        this.user = user;

      }


    });
  }




  getSex() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/gender/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }


  getUserToken() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/fcmtoken/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }

  getUserFirstName() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/firstName/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }
  getUserLastName() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/lastName/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }
  getUserCompany() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/company/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }
  getUserPosition() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/position/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }
  getUserPic() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/imageurl/`).once('value').then((snapshot) => {
      return snapshot.val() || 'assets/img/avatar-placeholder.gif';
    })
  }

  getFb() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/facebook/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }

  getTwitter() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/twitter/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }

  getLinkedin() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/linkedin/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }

  getPhone() {
    let userId = this.user.uid;
    return this.db.database.ref(`/users/${userId}/phone/`).once('value').then((snapshot) => {
      return snapshot.val() ;
    })
  }

newNotification(data){
  let userId = this.user.uid;
  firebase.database().ref().child(`users/${userId}/notifications/`).push(data);

}

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
      credentials.password);
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(function (user) {
        var ref = firebase.database().ref().child("users");
        var data = {
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,

          imageurl: credentials.imageurl,
          gender: credentials.gender,
          country: credentials.country,


          id: user.user.uid

        }
        ref.child(user.user.uid).set(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
          console.log("Saved");
          let user = firebase.auth().currentUser;
          user.sendEmailVerification();

          //  $location.path('/profile');
        }, function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorCode == 'auth/email-already-in-use') {
          alert('The email is already taken.');
        } else if (errorCode == 'auth/weak-password') {
          alert('Password is weak');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  profileUpdate(credentials){
    var ref = firebase.database().ref().child("users");
    var data = {

      firstName: credentials.firstName,
      lastName: credentials.lastName,
      company: credentials.company,
      phone: credentials.phone,
      website: credentials.website,
      facebook: credentials.facebook,
      twitter: credentials.twitter,
      linkedin: credentials.linkedin,
      position: credentials.position,
      imageurl: credentials.imageurl,





    }
    ref.child(this.user.uid).update(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
      console.log("Updated");
      // let user = firebase.auth().currentUser;
      // user.sendEmailVerification();
      //  $location.path('/profile');
    }, function (error) {
      console.log(error);
    });

  }

  newPost(credentials) {
        var ref = firebase.database().ref().child("posts");
        var data = {

          firstName: credentials.firstName,
          lastName: credentials.lastName,
          company: credentials.company,
          position: credentials.position,
          body: credentials.body,
          id: this.user.uid

        }
        ref.child(this.user.uid).push(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
          console.log("Saved");
          //  $location.path('/profile');
        }, function (error) {
          console.log(error);
        });

  }


  get authenticated(): boolean {
    return this.user !== null;
  }

  getEmail() {
    return this.user && this.user.email;
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      var timestamp = new Date().getUTCMilliseconds();
      let imageRef = storageRef.child('userimage').child(timestamp.toString());
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.ref.getDownloadURL())
            console.log(snapshot.ref.getDownloadURL())

            // save image url around here
          }, err => {
            reject(err);
          })
      })
    })
  }



}
