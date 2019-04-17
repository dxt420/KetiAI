import { Component } from '@angular/core';
import { IonicPage, NavController, normalizeURL, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
// import { TabsPage } from '../tabs/tabs';
import { ImagePicker } from '@ionic-native/image-picker';
import { FcmProvider } from '../../providers/fcm/fcm';
import { LoginPage } from '../login/login';
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signupError: string;
	form: FormGroup;
	userToken;


	imgurl:string = "assets/img/avatar-placeholder.gif";
	constructor(
		fb: FormBuilder,
    private navCtrl: NavController,
		private auth: AuthProvider,
		public toastCtrl: ToastController,
		public imagePicker: ImagePicker,
		public cropService: Crop,
		fcm: FcmProvider,

	) {
		this.form = fb.group({
			oname: ['', Validators.compose([Validators.required])],
			sname: ['', Validators.compose([Validators.required])],

      gender: [],
      country: [],

			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});

		fcm.firebaseNative.getToken().then(token=>{
			this.userToken = token;
		})

  }




  signup() {
		let data = this.form.value;
		let credentials = {
			password: data.password,
			email: data.email,
			firstName: data.oname,
			lastName: data.sname,

      gender: data.gender,
      country: data.country,

			imageurl: this.imgurl
		};
		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(LoginPage),
			error => this.signupError = error.message
		);
}




uploadImageToFirebase(image){
	image = normalizeURL(image);

	//uploads img to firebase storage
	this.auth.uploadImage(image)
	.then(photoURL => {
		console.log(photoURL);

		this.imgurl = photoURL;

		let toast = this.toastCtrl.create({
			message: 'Image was updated successfully',
			duration: 3000
		});
		toast.present();
		})
	}


openImagePicker(){
	this.imagePicker.hasReadPermission().then(
		(result) => {
			if(result == false){
				// no callbacks required as this opens a popup which returns async
				this.imagePicker.requestReadPermission();
			}
			else if(result == true){
				this.imagePicker.getPictures({
					maximumImagesCount: 1
				}).then(
					(results) => {
						for (var i = 0; i < results.length; i++) {
							this.uploadImageToFirebase(results[i]);
						}
					}, (err) => console.log(err)
				);
			}
		}, (err) => {
			console.log(err);
		});
	}




	openImagePickerCrop(){
		this.imagePicker.hasReadPermission().then(
		  (result) => {
			if(result == false){
			  // no callbacks required as this opens a popup which returns async
			  this.imagePicker.requestReadPermission();
			}
			else if(result == true){
			  this.imagePicker.getPictures({
				maximumImagesCount: 1
			  }).then(
				(results) => {
				  for (var i = 0; i < results.length; i++) {
					this.cropService.crop(results[i], {quality: 75}).then(
					  newImage => {
						this.uploadImageToFirebase(newImage);
					  },
					  error => console.error("Error cropping image", error)
					);
				  }
				}, (err) => console.log(err)
			  );
			}
		  }, (err) => {
			console.log(err);
		  });
		}
}



