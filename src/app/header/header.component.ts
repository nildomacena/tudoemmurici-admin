import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(public afAuth: AngularFireAuth, public router: Router) {

  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      setTimeout(() => {
        this.user = user;
      }, 500);
        if (!user)
        this.router.navigate(['']);
      setTimeout(() => {

        jQuery(".dropdown-button").dropdown({hover:true});
      }, 500);
    });
  }


  sair() {
    this.afAuth.auth.signOut();
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

}
