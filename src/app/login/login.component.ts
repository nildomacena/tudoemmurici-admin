import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  senha:string;
  constructor(public fire: FireService, public router: Router, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user)
      this.router.navigate(['cadastro']);
    })
  }

  ngOnInit() {
  }

  login(){
    this.fire.login({email:this.email, senha:this.senha});
  }

}
