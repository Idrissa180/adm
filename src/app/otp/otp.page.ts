import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import axios from "axios";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  form={
    number:"",
    otp:""
  };
  authToken: any;

  constructor(private route: ActivatedRoute, private router: Router,  private toastController: ToastController) {}

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(this.authToken ){
      this.router.navigate(['/tabs/tab1']);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: "une erreur s'est produite, Veuillez veriéfiez otp!",
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  ngOnInit() {
    this.ionViewDidEnter()
    this.route.paramMap.subscribe(params => {
      const number = params.get('number');
      this.form.number = number !== null ? number : '';
    });
  }

  

  async signIn() {
    try {
    const response = await axios.post(`https://api-ydays.onrender.com/api/auth/verify`, this.form)
    this.authToken=response.data
    window.localStorage.setItem("token",JSON.stringify(this.authToken))
    this.router.navigate(['/tabs/tab1']);
    } catch(error){
      console.error(error);
    };
  }

}
