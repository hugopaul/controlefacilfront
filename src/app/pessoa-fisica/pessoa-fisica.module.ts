import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaFisicaRoutingModule } from './pessoa-fisica-routing.module';
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
    PessoaFisicaRoutingModule,
    OrderModule
  ],
  exports:[
    CadastroComponent,
    ListaComponent
  ]
})
export class PessoaFisicaModule { }
