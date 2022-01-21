import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaJuridicaRoutingModule } from './pessoa-juridica-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { ListaComponent } from './lista/lista.component';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    CadastroComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PessoaJuridicaRoutingModule,
    OrderModule
  ],
  exports: [
    CadastroComponent,
    ListaComponent
  ]
})
export class PessoaJuridicaModule { }
