import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from "axios";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  authToken: any;
  notifs:any;

  constructor(private navCtrl: NavController, private router: Router, private toastController: ToastController) { }

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(!this.authToken ){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.ionViewDidEnter()
    this.getNotif(this.authToken._id)  
  }

  getStatusColor(status: string): string {
    if (status === 'verified') {
      return 'success'; 
    } else if (status === 'pending') {
      return 'warning'; 
    } else if (status === 'unverified') {
      return 'danger'; 
    } else {
      return 'primary'; 
    }
  }

  getButtonText(status: string): string {
    if (status === 'waiting-payment') {
      return 'Payer';
    } else if (status === 'purpose-audio'){
      return "reponde l'offre";
    } else if (status === 'waiting-payment'){
      return 'Envoyer preuve';
    } else {
      return '';
    }
  }

  goPayment(card: any){
    this.router.navigate(['/payment',card._id]);
  }

  goBack() {
    this.navCtrl.back();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Proposition accepter avec succes!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
  async presentToastR(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Proposition refuser!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  Accepter(card: any){
    axios.put(`http://localhost:5000/api/bookings/${card._id}`, {status: "waiting-payment"})
      .then(response => {
        this.presentToast('top')
      })
      .catch(error => {
        console.error(error);
      });
  }
  Refuse(card: any){
    axios.put(`http://localhost:5000/api/bookings/${card._id}`, {status: "canceled"})
      .then(response => {
        this.presentToastR('top')
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  getNotif(id: string) {
    axios.get(`http://localhost:5000/api/bookings/notif/${id}`)
      .then(response => {
        this.notifs=response.data
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

}
