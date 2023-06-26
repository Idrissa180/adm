import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import axios from "axios";

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  async ionViewDidEnter() {
    const token = window.localStorage.getItem("token");
    this.authToken = token !== null ? JSON.parse(token) : null;
    if(this.authToken ){
      this.router.navigate(['/tabs/tab1']);
    }
  }

  ngOnInit() {
    this.ionViewDidEnter()
    this.route.paramMap.subscribe(params => {
      const number = params.get('id');
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
