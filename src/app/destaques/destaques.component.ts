import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.css']
})
export class DestaquesComponent implements OnInit {
  destaques: any[] = [];

  constructor(public fire:FireService) {
    this.getDestaques();

  }

  ngOnInit() {
  }
  getDestaques() {
    this.fire.getDestaques()
      .then(destaques => {
        this.destaques = destaques;
      });
  }
  removerDestaque(destaque){
    if(confirm(`Deseja realmente remover dos destaques ${destaque.estabelecimento.nome}?`))
      this.fire.removerDestaque(destaque.estabelecimento)
        .then(_ => {
          this.fire.toast('Destaque removido');
          this.getDestaques();
        })
        .catch(err => {
          console.error(err);
          alert('Ocorreu um erro durante a remoção');
          this.getDestaques();
        })
  }
}
