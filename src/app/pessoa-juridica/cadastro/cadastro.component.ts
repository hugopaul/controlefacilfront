import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { PessoaJuridica } from '../pessoaJuridica';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  
  pessoaJuridica : PessoaJuridica ;
  success: boolean = false;
  errors: any[] = [];
  
  constructor(
    private router : Router,
    private api : ApiService,
    private acttivatedRouter : ActivatedRoute

  ) { 
    this.pessoaJuridica = new PessoaJuridica();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.acttivatedRouter.params;
    params.subscribe(urlParams =>{
      this.pessoaJuridica.id = urlParams['id'];
      if(this.pessoaJuridica.id){
        this.api.getPessoaJuridicaById(this.pessoaJuridica.id).subscribe( 
          response => this.pessoaJuridica = response, errorResponse => this.pessoaJuridica = new PessoaJuridica())
      }
    })
  }

  voltar(){
      this.router.navigate(["home"])
  }
  onSubmit(){
    if (this.pessoaJuridica.id) {
      this.api.putPessoaJuridica(this.pessoaJuridica)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          console.log(this.errors)
          this.errors = ['Erro ao Atualizar.']
        })
    } else {
      this.api
        .salvarPessoaJuridica(this.pessoaJuridica)
        .subscribe(           
          response => {
          this.errors = [];
          this.success = true;
          this.pessoaJuridica = response;
        }, errorResponse => {
          this.success = false;
          console.log(errorResponse);
          this.errors = errorResponse.error.errors;
        });
    
  }
  }
  desativar(){
    if(this.pessoaJuridica.id){
      this.api.desativaPessoaJuridicaById(this.pessoaJuridica.id).subscribe(
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
    if(this.pessoaJuridica.id){
      this.api.ativaPessoaJuridicaById(this.pessoaJuridica.id).subscribe(
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
