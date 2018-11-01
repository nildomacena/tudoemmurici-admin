import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FireService } from './fire.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ConsultaEstabelecimentoComponent } from './consulta-estabelecimento/consulta-estabelecimento.component';
import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AgmCoreModule } from '@agm/core';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { SorteiosComponent } from './sorteios/sorteios.component';
import { DestaquesComponent } from './destaques/destaques.component';


const firebaseConfig = {
  apiKey: "AIzaSyBYUNHsD_X4yxr60N9Vjgb2kZSEQA3-Egs",
  authDomain: "tradegames-2dff6.firebaseapp.com",
  databaseURL: "https://tradegames-2dff6.firebaseio.com",
  projectId: "tradegames-2dff6",
  storageBucket: "tradegames-2dff6.appspot.com",
  messagingSenderId: "374168288805"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    CadastroComponent,
    ConsultaEstabelecimentoComponent,
    EstabelecimentoComponent,
    NotificacaoComponent,
    SorteiosComponent,
    DestaquesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB8pu0UXs3XDxxcsc1-8Zv5PYwet5-Vm8Y'
    })
  ],
  providers: [
    FireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
