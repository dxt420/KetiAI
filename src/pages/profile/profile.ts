import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, normalizeURL, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ImagePicker } from '@ionic-native/image-picker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Crop } from '@ionic-native/crop';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  fname = "0";
  lname;
  company;
  pic;
  position;
  img;
  initials;
  phone;
  fb;
  fbk;
  twitter;
  linkedin;
  gender;
  form: FormGroup;
  constructor(public alertCtrl:AlertController,public cropService: Crop,public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider, public toastCtrl: ToastController, public imagePicker: ImagePicker, fb: FormBuilder) {
    this.authProvider.getUserFirstName()
      .then(fname => {

        this.fname = fname;
        this.initials = fname.charAt(0) + "";

      })
      .catch(error => {
        console.log('OOPS, error', error)
      })




    this.authProvider.getUserLastName()
      .then(fname => {
        this.lname = fname;
        this.initials += fname.charAt(0) + "";
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })

    this.authProvider.getUserCompany()
      .then(fname => {
        this.company = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })

      this.authProvider.getSex()
      .then(fname => {
        this.gender = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })

    this.authProvider.getUserPosition()
      .then(fname => {

        this.position = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })

    this.authProvider.getUserPic()
      .then(fname => {

        this.imgurl = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })

      this.authProvider.getPhone()
      .then(fname => {

        this.phone = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })


    this.authProvider.getFb()
      .then(fname => {

        this.fbk = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })


    this.authProvider.getTwitter()
      .then(fname => {

        this.twitter = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })



    this.authProvider.getLinkedin()
      .then(fname => {

        this.linkedin = fname;
      })
      .catch(error => {
        console.log('OOPS, error', error)
      })






    this.form = fb.group({
      oname: ['', Validators.compose([Validators.required])],
      sname: ['', Validators.compose([Validators.required])],
      company: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])],
      gender: [],
      website: [],
      facebook: [],
      twitter: [],
      linkedin: [],
    });

  }

  isAvatar: boolean;


  isEditable1: boolean = false;
  isEditable2: boolean = false;
  isEditable3: boolean = false;
  isEditable4: boolean = false;
  isEditable5: boolean = false;
  isEditable6: boolean = false;
  isEditable7: boolean = false;
  isEditable8: boolean = false;


  public error: string[] = [];
  imgurl;
  // imgurl: string = this.pic;

  setValue(name: string, index: number) {
    console.log(name);
    this.error[index] = name.substring(0, 2);
  }

  first() {
    return this.fname.charAt(0) + "" + this.lname.charAt(0);
  }

  updateInfo() {
    let data = this.form.value;
    let credentials = {
      firstName: data.oname,
      lastName: data.sname,
      company: data.company,
      phone: data.phone,
      website: data.website,
      facebook: this.fb,
      twitter: data.twitter,
      linkedin: data.linkedin,
      position: data.position,
      imageurl: this.imgurl,

    };
    this.authProvider.profileUpdate(credentials);
    this.isEditable1 = false;
    this.isEditable2 = false;
    this.isEditable3 = false;
    this.isEditable4 = false;
    this.isEditable5 = false;
    this.isEditable6 = false;
    this.isEditable7 = false;
    this.isEditable8 = false;

    
    this.ionViewDidLoad();

    let toast = this.toastCtrl.create({
      message: 'Profile Info Updated',
      duration: 3000
    });
    toast.present();

  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  edit1() {
    this.isEditable1 = true;
  }

  edit2() {
    this.isEditable2 = true;
  }
  edit3() {
    this.isEditable3 = true;
  }
  edit4() {
    this.isEditable4 = true;
  }
  edit5() {
    this.isEditable5 = true;
  }

  edit6() {
    this.isEditable6 = true;
  }
  edit7() {
    this.isEditable7 = true;
  }

  edit8() {
    this.isEditable8 = true;
  }

  uploadImageToFirebase(image) {
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.authProvider.uploadImage(image)
      .then(photoURL => {
        console.log(photoURL);
        this.imgurl = photoURL;
        let toast = this.toastCtrl.create({
          message: 'Profile Pic was updated successfully',
          duration: 3000
        });
        toast.present();
      })
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result == false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        }
        else if (result == true) {
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

  addsocial(){
    let alert = this.alertCtrl.create({
      title: "Facebook link",
      message: "Visit a your facebook profile and paste your url here",
      inputs: [
        {
          name: 'facebook',
          placeholder: 'Facebook Profile URL',
          value: this.fbk
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          role: 'cancel',
          handler: data => {
            this.fbk = data.facebook;
          }
        }
      ]
    });

    alert.present();
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }


  signOut() {
    this.authProvider.signOut();
  }
}
