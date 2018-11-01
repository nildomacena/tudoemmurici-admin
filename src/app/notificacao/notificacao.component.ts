import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {
  tituloNotificacao: string = '';
  corpoNotificacao: string = '';
  estabelecimentoKeyNotificacao: string;
  estabelecimentos: any[] = [];
  estabelecimentosFiltrados: any[] = [];

  constructor(public fire: FireService) { 
    this.getEstabelecimentos();
  }

  ngOnInit() {
  }
  getEstabelecimentos() {
    this.fire.getEstabelecimentos()
      .then(estabelecimentos => {
        this.estabelecimentos = this.estabelecimentosFiltrados = estabelecimentos;
        console.log(estabelecimentos);
      });
  }

  filtraEstabelecimentos(event) {
    if (event.srcElement.value == '') {
      this.estabelecimentosFiltrados = this.estabelecimentos;
    }
    else {
      this.estabelecimentosFiltrados = this.estabelecimentos.filter(estabelecimento => {
        return estabelecimento.nome.toUpperCase().includes(event.srcElement.value.toUpperCase());
      })
    }
    console.log(event.srcElement.value);

  }
  enviarNotificacao(selectNotificacao, textareaNotificacao) {
    console.log(selectNotificacao);
    if (!this.estabelecimentoKeyNotificacao || !this.corpoNotificacao)
      alert("Preencha todas as informações para enviar a notificação");
    else {
      if (confirm("Deseja realmente enviar uma notificação?"))
        this.fire.enviarNotificacao(this.tituloNotificacao, this.corpoNotificacao, this.estabelecimentoKeyNotificacao)
          .then(_ => {
            this.fire.toast('Notificação enviada');
            this.estabelecimentoKeyNotificacao = '';
            selectNotificacao.selectedIndex = 0;
            textareaNotificacao.value = '';
          })
    }
  }
}
