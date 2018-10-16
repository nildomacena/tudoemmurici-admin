import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { ConsultaEstabelecimentoComponent } from './consulta-estabelecimento/consulta-estabelecimento.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';


export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'consulta-estabelecimento', component: ConsultaEstabelecimentoComponent },
    { path: 'estabelecimento', component: EstabelecimentoComponent },
]