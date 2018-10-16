import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as M from 'materialize-css/dist/js/materialize';

declare var Materialize: any;

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) { }

  login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.senha);
  }

  getCategorias(): Promise<any> {
    return this.db.list('categorias').snapshotChanges().pipe(first()).toPromise().then(snap => this.snapshotParaValue(snap));
  }

  getPlanos(): Promise<any> {
    return this.db.list('planos').snapshotChanges().pipe(first()).toPromise().then(snap => this.snapshotParaValue(snap));
  }

  /**.then(snap => {
        return Promise.resolve(this.snapshotParaValue(snap))
      }); */


  snapshotParaValue(snapshot): any {
    console.log('snapshot', snapshot)
    let novaLista = [];
    if (snapshot.length > 0) {
      snapshot.map(objeto => {
        let novoObjeto = {};
        novoObjeto['key'] = objeto.key;
        let val = objeto.payload.val();
        Object.keys(val).map(key => {
          novoObjeto[key] = val[key]
        });
        novaLista.push(novoObjeto);
      });
      return novaLista;
    }
    else {
      console.log(snapshot);
      let novoObjeto = {};
      novoObjeto['key'] = snapshot.key;
      let val = snapshot.payload.val();
      Object.keys(val).map(key => {
        novoObjeto[key] = val[key]
      });
      console.log('novo objeto', novoObjeto)
      return novoObjeto;
    }
  }

  cadastrarEstabelecimento(estabelecimento: any): Promise<any> {
    estabelecimento['ativado'] = false;
    return this.db.list('estabelecimentos', ref => ref.orderByChild('email').equalTo(estabelecimento.email))
      .valueChanges().pipe(first()).toPromise().then(value => {
        if (value.length > 0)
          return Promise.reject('email já cadastrado');
        else
          return this.db.list('estabelecimentos').push(estabelecimento)
            .then(_ => {
              return Promise.resolve(true);
            })
      })
  }

  habilitarEstabelecimento(estabelecimento: any, habilitar: boolean) {
    return this.db.object(`estabelecimentos/${estabelecimento.key}`).update({ ativo: habilitar, categoriaAtivo: estabelecimento.categoria + "_" + habilitar });
  }
  
  getEstabelecimentosPorCategoria(categoria) {
    return this.db.list('estabelecimentos', ref => ref.orderByChild('categoria').equalTo(categoria))
      .snapshotChanges().pipe(first()).toPromise().then(snap => {
        console.log(snap);
        if (snap.length == 0)
          return [];
        return Promise.resolve(this.snapshotParaValue(snap));
      })
  }


  toast(mensagem: string, duracao?: number) {
    M.toast(mensagem, 3000);
  }
}
