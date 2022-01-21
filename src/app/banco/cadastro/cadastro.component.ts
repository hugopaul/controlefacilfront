import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recurso } from '../recurso';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  recurso : Recurso ;
  success: boolean = false;
  errors: any[] = [];
  
  constructor(
    private router : Router,
    private api : ApiService,
    private acttivatedRouter : ActivatedRoute

  ) { 
    this.recurso = new Recurso();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.acttivatedRouter.params;
    params.subscribe(urlParams =>{
      this.recurso.id = urlParams['id'];
      if(this.recurso.id){
        this.api.getRecursoById(this.recurso.id).subscribe( 
          response => this.recurso = response, errorResponse => this.recurso = new Recurso())
      }
    })
  }

  voltar(){
      this.router.navigate(["home"])
  }
  onSubmit(){
    if (this.recurso.id) {
      this.api.putRecurso(this.recurso)
        .subscribe(response => {
          this.success = true;
          this.errors = [];
        }, errorResponse => {
          console.log(this.errors)
          this.errors = ['Erro ao Atualizar.']
        })
    } else {
      this.api
        .salvarRecurso(this.recurso)
        .subscribe(           
          response => {
          this.errors = [];
          this.success = true;
          this.recurso = response;
        }, errorResponse => {
          this.success = false;
          console.log(errorResponse);
          this.errors = errorResponse.error.errors;
        });
    
  }
  }
  desativar(){
    if(this.recurso.id){
      this.api.desativaRecursoById(this.recurso.id).subscribe(
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
    if(this.recurso.id){
      this.api.ativaRecursoById(this.recurso.id).subscribe(
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
