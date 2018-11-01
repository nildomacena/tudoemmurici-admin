import { EstabelecimentoComponent } from './estabelecimento/estabelecimento.component';
import { ConsultaEstabelecimentoComponent } from './consulta-estabelecimento/consulta-estabelecimento.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { NotificacaoComponent } from './notificacao/notificacao.component';
import { SorteiosComponent } from './sorteios/sorteios.component';
import { DestaquesComponent } from './destaques/destaques.component';


export const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'consulta-estabelecimento', component: ConsultaEstabelecimentoComponent },
    { path: 'estabelecimento', component: EstabelecimentoComponent },
    { path: 'notificacao', component: NotificacaoComponent },
    { path: 'sorteios', component: SorteiosComponent },
    { path: 'destaques', component: DestaquesComponent },
]