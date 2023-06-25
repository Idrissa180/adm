import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios"
// import { Storage } from '@ionic/storage';

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
  //token 
  authToken: any;

  constructor() {}

  ngOnInit() {
    console.log(this.form)
  }

  // async ionViewDidEnter() {
  //   this.authToken = await this.storage.get('authToken');
  // }

  signIn() {
    axios.post(`https://api-ydays.onrender.com/api/auth/login`, this.form)
    .then(response=>{
      console.log(response)

      // this.authToken = response.data.token;

      // this.storage.set('authToken', this.authToken);
    }).catch(error=>{
        console.error(error);
      })
  }

}
