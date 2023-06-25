import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-disponibilite',
  templateUrl: './disponibilite.page.html',
  styleUrls: ['./disponibilite.page.scss'],
})
export class DisponibilitePage implements OnInit {

  cardsData: { startWeek: string, endWeek: string, available: boolean}[] = [];
  idPack: string = "";
  isAlertOpen = false;
  public alertButtons = ['OK'];

  constructor(private navCtrl: NavController,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      if(Id){
        this.getData(Id);
      }
    });
  }

  navigateToPage(card: any) {
    if (!card.available) {
      console.log(card)
      this.navCtrl.navigateForward(['/formulaire', this.idPack, card.startWeek, card.endWeek]);
    }else{
      this.isAlertOpen = true;
    }
  }
  setClose(){
    this.isAlertOpen = false;
  }

  goBack() {
    this.navCtrl.back();
  }
  getData(id: string) {
    axios.get(`https://api-ydays.onrender.com/api/packs/availability/${id}`)
      .then(response => {
        // Récupérer les données de la réponse
        this.cardsData = response.data;
        this.idPack=id
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }

}
