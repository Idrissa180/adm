import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import axios from "axios";
import { ToastController } from '@ionic/angular';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AlertController } from '@ionic/angular';
import { Cloudinary, ResourceType } from '@capawesome/capacitor-cloudinary';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  formData = {
    paymentMethode: '',
    received: 'https://res.cloudinary.com/advity/image/upload/v1687850770/Wafacash_juinu9.webp',
  };

  packId: any;
  Price: any;

  authToken: any;

  constructor( private alertCtrl: AlertController, private webview: WebView, private camera: Camera, private navCtrl: NavController, private router: Router,private route: ActivatedRoute, private toastController: ToastController) { }

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(!this.authToken ){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.ionViewDidEnter()
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.packId= id
    });
    this.getPack(this.packId)
  }

  cameraOptions: CameraOptions = {
    quality: 100,
    allowEdit: false,
    correctOrientation: true,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  galleryOptions: CameraOptions={
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 100,
    allowEdit: true,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }
  photo:any="";
  
  getPack(id: string) {
    axios.get(`https://api-ydays.onrender.com/api/packs/find/${id}`)
      .then(response => {
        this.Price=response.data.totalPrice
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Reservation envoyer avec succès!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  goBack() {
    this.navCtrl.back();
  }
  
  async choosePhoto(){
    let alertBox = await this.alertCtrl.create({
      header: "Choose From",
      buttons: [
        {
          text: "Camera",
          handler: ()=>{
            this.camera.getPicture(this.cameraOptions).then(res=>{
              console.log("response= ", res)
              let finalImg = this.webview.convertFileSrc(res);
              this.photo = finalImg;
            })
          }
        },
        {
          text: "Gallery",
          handler:()=>{
            this.camera.getPicture(this.galleryOptions).then(res=>{
              console.log("response= ", res)
              let finalImg = this.webview.convertFileSrc(res);
              this.photo = finalImg;
          })
        }
        },
      ],
    })
    await alertBox.present();
  }

  
  

  Payment(id: string) {
    const initialize = async () => {
      await Cloudinary.initialize({ cloudName: 'my_cloud_name' });
    };

    // const uploadResource = async () => {
    //   await Cloudinary.uploadResource({
    //     path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Images/test.png',
    //     publicId: 'my_public_id',
    //     resourceType: ResourceType.image,
    //     uploadPreset: 'my_preset',
    //   });
    // };


    axios.post(`https://api-ydays.onrender.com/api/bookings/received/${id}`, this.formData)
      .then(response => {
        this.presentToast('top')
      })
      .catch(error => {
        console.error(error);
      });
  }

  submitForm() {

    this.Payment(this.packId)
    this.router.navigate(['/tabs/tab1']);
  }

}
