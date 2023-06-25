import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import axios from "axios";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  userId="";
  notifs:any;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.userId="648074311df97e4992c4832a";

    this.getNotif(this.userId)
    
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
        // Gérer les erreurs
        console.error(error);
      });
  }

}
