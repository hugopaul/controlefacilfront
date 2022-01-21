import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PessoaJuridica } from '../pessoaJuridica';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {


  pessoasJuridicas: PessoaJuridica[]=[];
  pessoaJuridicaSelect: PessoaJuridica;
  mensagemSucesso: string = "";
  mensagemErro: string = "";
  key: string = "id"; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;

  constructor(
    private service : ApiService,
    private router: Router
  ) {     this.pessoaJuridicaSelect = new PessoaJuridica();  }

  ngOnInit(): void {
    this.service.getPessoaJuridica()
      .subscribe( response => this.pessoasJuridicas = response);
  }

  preparaDelecao(pessoaJuridica : PessoaJuridica){
    this.pessoaJuridicaSelect = pessoaJuridica;
  }
  preparaAtivacao(pessoaJuridica : PessoaJuridica){
    this.pessoaJuridicaSelect = pessoaJuridica;
  }

  
  desativar(){
    this.pessoaJuridicaSelect.desativado = 1;
    if(this.pessoaJuridicaSelect.id){
      this.service.desativaPessoaJuridicaById(this.pessoaJuridicaSelect.id).subscribe(
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
  if(this.pessoaJuridicaSelect.id){
    this.service.ativaPessoaJuridicaById(this.pessoaJuridicaSelect.id).subscribe(
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
  if(this.pessoaJuridicaSelect.desativado == 1){
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
