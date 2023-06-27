import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form={
    email:"",
    password:""
  };
  authToken: any;


  constructor(private router: Router, private toastController: ToastController) {}

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: "une erreur s'est produite, Veuillez veriéfiez vos informations!",
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(this.authToken ){
      this.router.navigate(['/tabs/tab1']);
    }
  }

  ngOnInit() {
    this.ionViewDidEnter()
  }

  

  async signIn() {
    try {
    const response = await axios.post(`https://api-ydays.onrender.com/api/auth/login`, this.form)
    this.authToken=response.data
    window.localStorage.setItem("token",JSON.stringify(this.authToken))
    window.localStorage.setItem("lang","fr")
    this.router.navigate(['/tabs/tab1']);
    } catch(error){
      this.presentToast('top')
    };
  }

}
