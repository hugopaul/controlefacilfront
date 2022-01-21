import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { PessoaFisica } from '../pessoaFisica';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  pessoaFisica : PessoaFisica ;
  success: boolean = false;
  errors: any[] = [];
  
  constructor(
    private router : Router,
    private api : ApiService,
    private acttivatedRouter : ActivatedRoute

  ) { 
    this.pessoaFisica = new PessoaFisica();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.acttivatedRouter.params;
    params.subscribe(urlParams =>{
      this.pessoaFisica.id = urlParams['id'];
      if(this.pessoaFisica.id){
        this.api.getPessoaFisicaById(this.pessoaFisica.id).subscribe( 
          response => this.pessoaFisica = response, errorResponse => this.pessoaFisica = new PessoaFisica())
      }
    })
  }

  voltar(){
      this.router.navigate(["home"])
  }
  onSubmit(){
    if (this.pessoaFisica.id) {
      this.api.putPessoaFisica(this.pessoaFisica)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          console.log(this.errors)
          this.errors = ['Erro ao Atualizar.']
        })
    } else {
      this.api
        .salvarPessoaFisica(this.pessoaFisica)
        .subscribe(           
          response => {
          this.errors = [];
          this.success = true;
          this.pessoaFisica = response;
        }, errorResponse => {
          this.success = false;
          console.log(errorResponse);
          this.errors = errorResponse.error.errors;
        });
    
  }
  }
  desativar(){
    if(this.pessoaFisica.id){
      this.api.desativaPessoaFisicaById(this.pessoaFisica.id).subscribe(
        response => {
          this.router.navigate(["home"])

        }, errorResponse => {
          this.errors = ["Erro ao desativar"]
        }
      )
    }else{
      this.errors = ["Registro ainda não foi salvo"]
    }
  }
  ativar(){
    if(this.pessoaFisica.id){
      this.api.ativaPessoaFisicaById(this.pessoaFisica.id).subscribe(
        response => {
          this.success = true;
          window.location.reload();
        }, errorResponse => {
          this.errors = ["Erro ao desativar"]
        }
      )
    }else{
      this.errors = ["Registro ainda não foi salvo"]
    }
  }
}
