import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  authToken: any;
  notifs:any;

  constructor(private navCtrl: NavController, private router: Router) { }

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

  goBack() {
    this.navCtrl.back();
  }
  
  getNotif(id: string) {
    axios.get(`https://api-ydays.onrender.com/api/bookings/notif/${id}`)
      .then(response => {
        this.notifs=response.data
        console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

}
