import { FireService } from './../fire.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var Materialize: any;

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup;
  categorias: any[];
  planos: any[];
  constructor(public fire: FireService) {
    this.formCadastro = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'nome': new FormControl('', [Validators.required]),
      'categoria': new FormControl('', [Validators.required]),
      'plano': new FormControl('', [Validators.required]),
      'imagemAdicional': new FormControl(false, [Validators.required]),
      'slides': new FormControl(false, [Validators.required])
    });
    this.fire.getCategorias()
      .then(categorias => {
        this.categorias = categorias;
        console.log(categorias);
      });

    this.fire.getPlanos()
      .then(planos => {
        this.planos = planos;
        console.log(planos);
      });
  }

  ngOnInit() {
  }

  onSubmitCadastro() {
    this.fire.cadastrarEstabelecimento(this.formCadastro.value)
      .then(_ => {
        this.fire.toast('Estabelecimento cadastrado.');
        this.formCadastro.reset();
      })
      .catch(err => {
        alert("Erro: " + err);
      })
  }


}
