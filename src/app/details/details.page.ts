import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

  cardsData: any;
  idPack: string = "";

  constructor(private navCtrl: NavController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      if(Id){
        console.log(Id)
        this.getData(Id);
      }
    });
  }

  onClick() {
    this.navCtrl.navigateForward(['/disponibilite', this.idPack]);
  }
  goBack() {
    this.navCtrl.back();
  }

  getData(id: string) {
    axios.get(`https://api-ydays.onrender.com/api/packs/find/${id}`)
      .then(response => {
        // Récupérer les données de la réponse
        this.cardsData = response.data;
        this.idPack=id;
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }

}
