import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cardsData: {_id: string, title: string, img: string ,startDay: string, endDay:string, price_1_week: string, price_2_week: string}[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getData();
  }

  goToDetail(id: string) {
    this.router.navigate(['/details/', id])
  }

  getData() {
    axios.get('https://api-ydays.onrender.com/api/packs')
      .then(response => {
        // Récupérer les données de la réponse
        this.cardsData = response.data;
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }

}
