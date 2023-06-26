import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form={
    number:"",
    email:"",
    password:"",
    firstname:"",
    lastname:""
  };
  authToken: any;

  constructor(private router: Router) {}

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

  goLogin(){
    this.router.navigate(['/login']);
  }

  

  async signUp() {
    try {
      if(this.form.number===""){
        const response = await axios.post(`https://api-ydays.onrender.com/api/auth/register`, {
          firstname:this.form.firstname,
          lastname:this.form.lastname,
          email:this.form.email,
          password:this.form.password
        })
        this.authToken=response.data
        window.localStorage.setItem("token",JSON.stringify(this.authToken))
        this.router.navigate(['/tabs/tab1']);
      }else{
        const response = await axios.post(`https://api-ydays.onrender.com/api/auth/register`, this.form)
        this.router.navigate(['/otp', this.form.number]);
      }
    } catch(error){
      console.error(error);
    };
  }

}
