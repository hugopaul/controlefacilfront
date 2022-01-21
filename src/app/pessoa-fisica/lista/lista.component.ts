import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PessoaFisica } from '../pessoaFisica';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  pessoasFisicas: PessoaFisica[]=[];
  pessoaFisicasSelect: PessoaFisica;
  mensagemSucesso: string = "";
  mensagemErro: string = "";
  key: string = "id"; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;

  constructor(
    private service : ApiService,
    private router: Router
  ) {     this.pessoaFisicasSelect = new PessoaFisica();  }

  ngOnInit(): void {
    this.service.getPessoaFisica()
      .subscribe( response => this.pessoasFisicas = response);
  }

  preparaDelecao(pessoaFisica : PessoaFisica){
    this.pessoaFisicasSelect = pessoaFisica;
  }
  preparaAtivacao(pessoaFisica : PessoaFisica){
    this.pessoaFisicasSelect = pessoaFisica;
  }

  
  desativar(){
    this.pessoaFisicasSelect.desativado = 1;
    if(this.pessoaFisicasSelect.id){
      this.service.desativaPessoaFisicaById(this.pessoaFisicasSelect.id).subscribe(
        response => {
          this.router.navigate(["home"])

        }, errorResponse => {
          this.mensagemErro = "Erro ao desativar"
        }
      )
    }else{
      this.mensagemErro = "Registro ainda não foi salvo"
    
  }
}
ativar(){
  if(this.pessoaFisicasSelect.id){
    this.service.ativaPessoaFisicaById(this.pessoaFisicasSelect.id).subscribe(
      response => {
        this.mensagemSucesso = "Ativado";
        window.location.reload();
      }, errorResponse => {
        this.mensagemErro = "Erro ao desativar"
      }
    )
  }else{
    this.mensagemErro = "Registro ainda não foi salvo"
  }
}
ativaoudesativa(){
  if(this.pessoaFisicasSelect.desativado == 1){
    this.ativar();
  }else{
    this.desativar();
  }
}
  // Configuração da ordenação
  
  sort(key:any) {
      this.key = key;
      this.reverse = !this.reverse;
  }
}
