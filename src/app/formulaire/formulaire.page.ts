import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import axios from "axios"
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.page.html',
  styleUrls: ['./formulaire.page.scss'],
})
export class FormulairePage implements OnInit {

  formData = {
    packId: '',
    userId: 'test',
    startWeek: '',
    endWeek: '',
    entreprise: '',
    totalPrice: '',
    link_audio: 'https://res.cloudinary.com/advity/video/upload/v1687296328/paro-8d-audio-allo-allo-song-paro-reels-remix-sped-up-aloalosong_uynwkp.wav',
  };
  packName="";
  packPrice1="";
  packPrice2="";
  semaine="";

  constructor(private navCtrl: NavController,private route: ActivatedRoute, private toastController: ToastController) { }
  ngOnInit() {
    console.log(this.formData)
    this.route.paramMap.subscribe(params => {
      // Récupérer les paramètres de l'URL et affecter les valeurs aux données du formulaire
      const id = params.get('id');
      const startWeek = params.get('startWeek');
      const endWeek = params.get('endWeek');
      this.formData.packId = id !== null ? id : '';
      this.formData.startWeek = startWeek !== null ? startWeek : '';
      this.formData.endWeek = endWeek !== null ? endWeek : '';
      this.getPack(id !== null ? id : '')
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

  getPack(id: string) {
    axios.get(`https://api-ydays.onrender.com/api/packs/find/${id}`)
      .then(response => {
        this.packName=response.data.title
        this.packPrice1=response.data.price_1_week
        this.packPrice2=response.data.price_2_week
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }
  newBooking(id: string) {
    axios.post(`https://api-ydays.onrender.com//api/bookings/${id}`, this.formData)
      .then(response => {
        console.log(response)
        this.presentToast('top')
      })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
  }

  submitForm() {
    if(this.semaine==="1"){
      this.formData.totalPrice=this.packPrice1
    } else if(this.semaine==="2"){
      this.formData.totalPrice=this.packPrice2
    }

    this.newBooking(this.formData.packId)
    // Effectuer des actions lors de la soumission du formulaire
    console.log('Formulaire soumis :', this.formData);
  }

}
