import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as M from 'materialize-css/dist/js/materialize';
import { AngularFireStorage } from 'angularfire2/storage';

declare var Materialize: any;

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public storage: AngularFireStorage) { }

  login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.senha)

  }

  checkAdmin(uid:string){
    return this.db.list('admin', ref => ref.orderByChild('uid').equalTo(uid)).snapshotChanges().pipe(first()).toPromise();
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
    else if (snapshot.length == 0)
      return [];
    else {

      console.log(snapshot);
      let novoObjeto = {};
      novoObjeto['key'] = snapshot.key;
      let val = snapshot.payload.val();
      Object.keys(val).map(key => {
        novoObjeto[key] = val[key]
      });
      //console.log('novo objeto', novoObjeto)*/
      return [];
    }
  }

  getEstabelecimentos() {
    console.log('getEstabelecimentos()');
    return this.db.list('estabelecimentos', ref => ref.orderByChild('ativo').equalTo(true))
      .snapshotChanges().pipe(first()).toPromise().then(snap => {
        console.log('estabelecimentos', snap);
        return Promise.resolve(this.snapshotParaValue(snap));
      })
  }

  cadastrarEstabelecimento(estabelecimento: any): Promise<any> {
    console.log(estabelecimento);
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

  updateDadosEstabelecimento(estabelecimento, key): Promise<any> {
    console.log(estabelecimento);
    return this.db.object(`estabelecimentos/${estabelecimento.key}`).update(estabelecimento);
  }


  habilitarEstabelecimento(estabelecimento: any, habilitar: boolean) {
    return this.db.object(`estabelecimentos/${estabelecimento.key}`).update({ ativo: habilitar, categoriaAtivo: estabelecimento.categoria + "_" + habilitar });
  }

  atualizarPlano(key: string, plano: string) {
    return this.db.object(`estabelecimentos/${key}`).update({ plano: plano });
  }

  getEstabelecimentoByKey(key) {
    return this.db.object(`estabelecimentos/${key}`).valueChanges();
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

  salvarEndereco(estabelecimentoKey: string, coords: any): Promise<any> {
    return this.db.object(`estabelecimentos/${estabelecimentoKey}/coords`).update(coords);
  }

  salvarImagens(avatar, imagemAdicional?, imagemAdicional_2?, key?: any): Promise<any> {
    let estabelecimentoKey: string = key;
    //estabelecimentoKey = key;

    console.log(`avatar: ${avatar},imagemAdicional: ${imagemAdicional},imagemAdicional_2: ${imagemAdicional_2}`)
    let urlAvatar: string;
    let urlAdicional: string;

    if (imagemAdicional && avatar && imagemAdicional_2) {
      console.log('imagemAdicional && avatar && imagemAdicional_2');
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/avatar.jpg').put(avatar)
        .then(resultAvatar => {
          console.log(resultAvatar);
          urlAvatar = resultAvatar.downloadURL;
          return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional.jpg').put(imagemAdicional)
            .then(resultAdicional => {
              urlAdicional = resultAdicional.downloadURL;
              return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional_2.jpg').put(imagemAdicional_2)
                .then(resultAdicional2 => {
                  return Promise.resolve(true);
                  /*
                          let urlAdicional2 = resultAdicional2.downloadURL;
                          return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ avatar: urlAvatar, imagemAdicional: urlAdicional, imagemAdicional_2: urlAdicional2 });*/
                })
            })
        })
    }

    else if (imagemAdicional && avatar && !imagemAdicional_2) {
      console.log('imagemAdicional && avatar && !imagemAdicional_2');
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/avatar.jpg').put(avatar)
        .then(resultAvatar => {
          console.log(resultAvatar);
          urlAvatar = resultAvatar.downloadURL;
          return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional.jpg').put(imagemAdicional)
            .then(resultAdicional => {
              return Promise.resolve(true);
              /*
                  urlAdicional = resultAdicional.downloadURL;
                  return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ avatar: urlAvatar, imagemAdicional: urlAdicional });*/
            })
        })
    }

    else if (imagemAdicional && !avatar && imagemAdicional_2) {
      console.log('imagemAdicional && !avatar && imagemAdicional_2');
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional.jpg').put(imagemAdicional)
        .then(resultAdicional => {
          urlAdicional = resultAdicional.downloadURL;
          return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional_2.jpg').put(imagemAdicional_2)
            .then(resultAdicional2 => {
              return Promise.resolve(true);
              /*
                  let urlAdicional2 = resultAdicional2.downloadURL;
                  return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ imagemAdicional: urlAdicional, imagemAdicional_2: urlAdicional2 });*/
            })
        })
    }

    else if (!imagemAdicional && avatar && imagemAdicional_2) {
      console.log('!imagemAdicional && avatar && imagemAdicional_2');
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/avatar.jpg').put(avatar)
        .then(resultAvatar => {
          console.log(resultAvatar);
          urlAvatar = resultAvatar.downloadURL;
          return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional.jpg').put(imagemAdicional)
            .then(resultAdicional2 => {
              return Promise.resolve(true);
              /*
                  let urlAdicional2 = resultAdicional2.downloadURL;
                  return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ avatar: urlAvatar, imagemAdicional_2: urlAdicional2 });*/
            })
        })
    }

    else if (avatar) {
      console.log('avatar');
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/avatar.jpg').put(avatar)
        .then(result => {
          return Promise.resolve(true);
          /*
          console.log(result);
          return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ avatar: result.downloadURL });*/
        })
    }
    else if (imagemAdicional) {
      console.log('imagemadicional')
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional.jpg').put(imagemAdicional)
        .then(result => {
          return Promise.resolve(true);
          /*
          console.log(result);
          return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ imagemAdicional: result.downloadURL });*/
        });
    }
    else if (imagemAdicional_2) {
      console.log('imagemAdicional_2');
      return this.storage.ref('estabelecimentos/' + estabelecimentoKey + '/imagemAdicional_2.jpg').put(imagemAdicional_2)
        .then(_ => {
          return Promise.resolve(true);
          /*
          return this.storage.ref(estabelecimentoKey + '/imagemAdicional_2.jpg').getDownloadURL().pipe(first()).toPromise().then(result => {
            console.log(result);
            return this.db.object(`estabelecimentos/${estabelecimentoKey}`).update({ imagemAdicional_2: result });
          })*/
        });
    }
  }

  enviarNotificacao(titulo, corpo, estabelecimento) {
    return this.db.list('notificacoes').push({ titulo: titulo, corpo: corpo, estabelecimento: estabelecimento });
  }

  removerDestaque(estabelecimento) {
    return this.db.list(`destaques/${estabelecimento.key}`).remove();
  }

  colocarEmDestaque(estabelecimento): Promise<any> {
    return this.db.list(`destaques/${estabelecimento.key}`).set('estabelecimento', estabelecimento);
  }

  /**Sorteios */
  deletarSorteio(sorteio): Promise<void> {
    return this.storage.ref(`sorteios/${sorteio.key}`).delete().pipe(first()).toPromise()
      .then(_ => {
        return this.db.object(`sorteios/${sorteio.key}`).remove();
      })
      .catch(err => {
        console.error(err);
        if (err.code == "storage/object-not-found")
          return this.db.object(`sorteios/${sorteio.key}`).remove();
      })
  }
  getSorteios(): Promise<any> {
    return this.db.list('sorteios').snapshotChanges().pipe(first()).toPromise()
      .then(snap => {
        if (snap.length > 0)
          return Promise.resolve(this.snapshotParaValue(snap))
        else
          return Promise.resolve([]);
      })
  }
  salvarSorteio(sorteio: any) {
    sorteio['pendente'] = true;
    sorteio['ganhador'] = {};
    return this.db.list('sorteios').push(sorteio);
  }

  salvarImagemSorteio(imagem, key): Promise<any> {
    console.log('key sorteio: ', key);
    return this.storage.ref('sorteios/' + key + '/imagem.jpg').put(imagem)
      .catch(err => {
        console.error(err);
      })
    /*
    .then(dados => {
      console.log(dados.ref.fullPath);
      let fileRef = this.storage.ref(dados.ref.fullPath);
      return fileRef.getDownloadURL().pipe(first()).toPromise().then(url => {
          return this.db.object(`sorteios/${key}`).update({ imagem: url });

        })
      })*/
  }

  realizarSorteio(sorteio): Promise<any> {
    return this.db.object(`sorteios/${sorteio.key}`).update({ sortear: true });
  }

  getDestaques() {
    return this.db.list('destaques')
      .snapshotChanges().pipe(first()).toPromise().then(snap => {
        if (snap.length > 0)
          return Promise.resolve(this.snapshotParaValue(snap));
        else
          return Promise.resolve(null);
      })
  }

  toast(mensagem: string, duracao?: number) {
    Materialize.toast(mensagem, 3000);
  }
}
