import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-sorteios',
  templateUrl: './sorteios.component.html',
  styleUrls: ['./sorteios.component.css']
})
export class SorteiosComponent implements OnInit {
  imagemSorteio: any;
  pathImagemSorteio: any;
  sorteios: any[] = [];
  estabelecimentos: any[] = [];
  formSorteio: FormGroup;
  dataSorteio: any;
  estabelecimentosFiltrados: any[] = [];

  constructor(public fire: FireService) {
    this.getSorteios();
    this.getEstabelecimentos();
    this.formSorteio = new FormGroup({
      'titulo': new FormControl('', [Validators.required]),
      'texto': new FormControl('', [Validators.required]),
      'linkInstagram': new FormControl('', [Validators.required]),
      'imagem': new FormControl(''),
      'data': new FormControl(''),
      'estabelecimentoKey': new FormControl('', [Validators.required]),
      'estabelecimentoNome': new FormControl('')
    });
  }

  ngOnInit() {
    jQuery('.modal').modal();
    setTimeout(() => {
      jQuery('ul.tabs').tabs();
      jQuery('.datepicker').pickadate({
        closeOnSelect: false,
        selectMonths: true,
        today: 'Hoje',
        clear: 'Limpar',
        close: 'Ok',
        onSet: date => {
          this.dataSorteio = date.select;
        }
      });
    }, 200);

  }
  getSorteios() {
    setTimeout(() => {
      this.fire.getSorteios()
        .then(sorteios => {
          this.sorteios = sorteios;
        })
    }, 1000)
  }

  getEstabelecimentos() {
    this.fire.getEstabelecimentos()
      .then(estabelecimentos => {
        this.estabelecimentos = this.estabelecimentosFiltrados = estabelecimentos;
        console.log('estabelecimentos', estabelecimentos);
      });
  }

  uploadFileSorteio(event) {
    let file = this.imagemSorteio = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e => {
      //console.log(e.target.result);
      this.pathImagemSorteio = e.target['result'];
    });
    reader.readAsDataURL(file);

  }
  addSorteio() {
    jQuery('#modal-sorteio').modal('open');
  }
  deletarSorteio(sorteio) {
    if (confirm("Deseja realmente excluir o sorteio?"))
      this.fire.deletarSorteio(sorteio)
        .then(_ => {
          this.fire.toast('Sorteio deletado');
          this.getSorteios();
        })
  }

  onSubmitSorteio() {
    this.estabelecimentos.map(estabelecimento => {
      if (estabelecimento.key == this.formSorteio.value['estabelecimentoKey'])
        this.formSorteio.controls['estabelecimentoNome'].setValue(estabelecimento.nome);
    });
    console.log(this.formSorteio.value);
    this.formSorteio.controls['data'].setValue(new Date(this.dataSorteio).getTime());
    this.fire.salvarSorteio(this.formSorteio.value)
      .then(dados => {
        this.fire.salvarImagemSorteio(this.imagemSorteio, dados.key)
          .then(_ => {
            this.fire.toast('Sorteio salvo');
            jQuery('.modal').modal('close');
            this.formSorteio.reset();
            this.getSorteios();

          })
      })
  }

  realizarSorteio(sorteio) {
    this.fire.realizarSorteio(sorteio)
      .then(_ => {
        this.fire.toast('Sorteio realizado');
        this.getSorteios();
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
  console() {
    let data = new Date(this.formSorteio.value['data']);
    console.log(this.formSorteio.value, data);
  }
}
