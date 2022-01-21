import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recurso } from '../recurso';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  recursos: Recurso[]=[];
  recursoSelect: Recurso;
  mensagemSucesso: string = "";
  mensagemErro: string = "";
  key: string = "id"; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;

  constructor(
    private service : ApiService,
    private router: Router
  ) {     this.recursoSelect = new Recurso();  }

  ngOnInit(): void {
    this.service.getRecurso()
      .subscribe( response => this.recursos = response);
  }

  preparaDelecao(recurso : Recurso){
    this.recursoSelect = recurso;
  }
  preparaAtivacao(recurso : Recurso){
    this.recursoSelect = recurso;
  }

  
  desativar(){
    this.recursoSelect.desativado = 1;
    if(this.recursoSelect.id){
      this.service.desativaRecursoById(this.recursoSelect.id).subscribe(
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
  if(this.recursoSelect.id){
    this.service.ativaRecursoById(this.recursoSelect.id).subscribe(
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
  if(this.recursoSelect.desativado == 1){
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
