import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(public afAuth: AngularFireAuth, public router: Router) { 
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      if(!user)
        this.router.navigate(['']);
    });
  }

  ngOnInit() {
    jQuery(".dropdown-trigger").dropdown();
  }


  sair(){
    this.afAuth.auth.signOut();
  }

  onNavigate(route:string){
    this.router.navigate([route]);
  }

}
