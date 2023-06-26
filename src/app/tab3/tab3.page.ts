import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  authToken: any;

  constructor(private router: Router) { }

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(!this.authToken ){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.ionViewDidEnter()
    console.log(this.authToken)
  }
  
  async logout() {
    try {
      // Supprimer le token d'authentification du stockage local
      await window.localStorage.removeItem("token");

      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  }

}
