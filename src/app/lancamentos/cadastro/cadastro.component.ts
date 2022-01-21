import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, throwIfEmpty } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recurso } from 'src/app/banco/recurso';
import { PessoaFisica } from 'src/app/pessoa-fisica/pessoaFisica';
import { PessoaJuridica } from 'src/app/pessoa-juridica/pessoaJuridica';
import { Lancamento } from '../lancamentos';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  lancamento: Lancamento;
  success: boolean = false;
  errors: any[] = [];
  recursos: Recurso[]=[];
  pessoasFisicas: PessoaFisica[]=[];
  pessoasJuridicas: PessoaJuridica[]=[];
  nome!:any;
  nmBanco:any;

  valorServico!: string;

  constructor(
    private router: Router,
    private api: ApiService,
    private acttivatedRouter: ActivatedRoute

  ) {
    this.lancamento = new Lancamento();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.acttivatedRouter.params;
    params.subscribe(urlParams => {
      this.lancamento.id = urlParams['id'];
      if (this.lancamento.id) {
        this.api.getLancamentoById(this.lancamento.id).subscribe(
          response => {
            this.lancamento = response,
            this.valorServico = this.lancamento.valor.toString(),
            this.initMaskValue(this.valorServico)
            this.carregarTudo();
          },
          errorResponse => { this.lancamento = new Lancamento() })
      }
    })
    
  }
  carregarTudo(){
    if(this.lancamento.recurso != null ){
    this.api.getRecursoById(this.lancamento.recurso).subscribe(
      response => {
        this.nmBanco = response.nmBanco
      });
    }
      if(this.lancamento.pessoaFisica != null){
      this.api.getPessoaFisicaById(this.lancamento.pessoaFisica).subscribe(
        response => {
          this.nome = response.nome
        });
      }else if(this.lancamento.pessoaJuridica != null){
        this.api.getPessoaJuridicaById(this.lancamento.pessoaJuridica).subscribe(
          response => {
            this.nome = response.razaoSocial
          });}
          console.log(this.lancamento)
  }



  pfclick() {
    this.lancamento.pf = true
    this.lancamento.pj = false
    if(this.lancamento.pessoaFisica == null) {
      this.nome = ""
    } else {
      this.carregarTudo()
    }
    
  }
  pjclick() {
    this.lancamento.pf = false
    this.lancamento.pj = true
    if(this.lancamento.pessoaJuridica == null) {
      this.nome = ""
    } else {
      this.carregarTudo()
    }
  }
  buscarPf(pf:any) {
      this.api.getPessoaFisicaByName(this.nome).subscribe(
          response => {this.pessoasFisicas = response},
          errorResponse => {this.errors = errorResponse.error.errors}
      )
  }
  buscarPj(pj:any) {
    this.api.getPessoaJuridocaByName(this.nome).subscribe(
      response => {this.pessoasJuridicas = response},
      errorResponse => {this.errors = errorResponse.error.errors}
  )
  }
  buscarRecurso(x:any){
    this.api.getRecursoByName(this.nmBanco).subscribe(
      response => {this.recursos = response},
      errorResponse => {this.errors = errorResponse.error.errors})
  }
  selectPF(x:number){
    console.log(x)
      this.lancamento.pessoaFisica = x;
  }
  selectPj(x:number){
      this.lancamento.pessoaJuridica = x;
  }
  selectRecurso(x: number){
    this.lancamento.recurso = x;
  }
  
  voltar() {
    this.router.navigate(["home"])
  }
  onSubmit() {
    
    console.log(this.lancamento)
    this.valorServico = this.valorServico.replace('.', '');
    this.lancamento.valor = parseInt(this.valorServico)
    if (this.lancamento.id) {
      this.api.putLancamento(this.lancamento)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          console.log(this.errors)
          this.errors = ['Erro ao Atualizar.']
        })
    } else {
      this.api
        .salvarLancamento(this.lancamento)
        .subscribe(
          response => {
            this.errors = [];
            this.success = true;
            this.lancamento = response;
          }, errorResponse => {
            this.success = false;
            console.log(errorResponse);
            this.errors = errorResponse.error.errors;
          });

    }
  }
  limpaMotivo() {
    this.lancamento.motivoDesativar = "";
  }
  desativar() {
    this.lancamento.desativado = 1;
    if (this.lancamento.id) {
      this.api.desativaLancamentoById(this.lancamento.id, this.lancamento).subscribe(
        response => {
          this.router.navigate(["home"])

        }, errorResponse => {
          this.errors = ["Erro ao desativar"]
        }
      )
    } else {
      this.errors = ["Registro ainda não foi salvo"]
    }
  }
  ativar() {
    if (this.lancamento.id) {
      this.api.ativaLancamentoById(this.lancamento.id).subscribe(
        response => {
          this.success = true;
          window.location.reload();
        }, errorResponse => {
          this.errors = ["Erro ao desativar"]
        }
      )
    } else {
      this.errors = ["Registro ainda não foi salvo"]
    }
  }
  initMaskValue(x: string) {
    this.valorServico = this.valorServico.replace(/\D+/g, '');
    this.valorServico = this.valorServico.replace(/([0-9]{2})$/g, ",$1");
    if (this.valorServico.length > 6) {
      this.valorServico = this.valorServico.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return this.valorServico;
  }
  onKeyPress(x: any) {
     
    var valor = this.valorServico;

    valor = valor + '';
    valor = valor.replace(/[\D]+/g, '');
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    this.valorServico = valor;
    if(valor == 'NaN') this.valorServico = '';
    return this.valorServico;
  }
}
