import { Router } from '@angular/router';
import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-estabelecimento',
  templateUrl: './consulta-estabelecimento.component.html',
  styleUrls: ['./consulta-estabelecimento.component.css']
})
export class ConsultaEstabelecimentoComponent implements OnInit {
  categoriaSelecionada: any;
  categorias: any[];
  estabelecimentosCategoria: any[];
  constructor(public fire: FireService, public router: Router) {
    this.fire.getCategorias()
      .then(categorias => {
        this.categorias = categorias;
      })
  }

  ngOnInit() {
  }

  selectCategoria(categoria) {
    this.categoriaSelecionada = categoria;
    this.fire.getEstabelecimentosPorCategoria(categoria.key)
      .then(estabelecimentos => {
        console.log(estabelecimentos);
        this.estabelecimentosCategoria = estabelecimentos;
      })
  }

  onSelectEstabelecimento(estabelecimento) {
    console.log(estabelecimento);
    this.router.navigate(['estabelecimento'], { queryParams: { key: estabelecimento.key } });
  }

  habilitarEstabelecimento(estabelecimento, event) {
    this.fire.habilitarEstabelecimento(estabelecimento, event.path[0].checked)
      .then(_ => {
        this.fire.toast(event.path[0].checked ? 'Estabelecimento habilitado' : 'Estabelecimento desabilitado');
      })
  }
}
