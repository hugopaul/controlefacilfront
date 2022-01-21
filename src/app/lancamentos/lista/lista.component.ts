import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../lancamentos';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lancamentos: Lancamento[]=[];
  lancamentoSelect: Lancamento;
  mensagemSucesso: string = "";
  mensagemErro: string = "";
  key: string = "id"; // Define um valor padrão, para quando inicializar o componente
  reverse: boolean = false;
  valorServico! : string;
  constructor(
    private service : ApiService,
    private router: Router
  ) {     this.lancamentoSelect = new Lancamento();  }

  ngOnInit(): void {
    this.service.getLancamento()
      .subscribe( response => this.lancamentos = response);
  }

  preparaDelecao(lancamento : Lancamento){
    this.lancamentoSelect = lancamento;
    this.lancamentoSelect.motivoDesativar = "";
  }
  preparaAtivacao(lancamento : Lancamento){
    this.lancamentoSelect = lancamento;
    
    this.lancamentoSelect.motivoDesativar = "";
  }

  
  desativar(){
    this.lancamentoSelect.desativado = 1;
    if(this.lancamentoSelect.id){
      this.service.desativaLancamentoById(this.lancamentoSelect.id, this.lancamentoSelect).subscribe(
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
initMaskValue(x: number) {
  this.valorServico = x.toString() + '';
  this.valorServico = this.valorServico.replace(/\D+/g, '');
  
  this.valorServico = this.valorServico.replace(/([0-9]{2})$/g, ",$1");
  if (this.valorServico.length > 6) {
    this.valorServico = this.valorServico.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }
  return this.valorServico;
}
ativar(){
  if(this.lancamentoSelect.id){
    this.service.ativaLancamentoById(this.lancamentoSelect.id).subscribe(
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
  if(this.lancamentoSelect.desativado == 1){
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
