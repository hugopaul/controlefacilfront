import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancoRoutingModule } from './banco-routing.module';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CadastroComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    BancoRoutingModule,
    OrderModule,
    FormsModule
  ],
  exports:[
    CadastroComponent,
    ListaComponent
  ]
})
export class BancoModule { }
