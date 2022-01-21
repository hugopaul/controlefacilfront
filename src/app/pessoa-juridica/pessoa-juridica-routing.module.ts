import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from '../pessoa-juridica/lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  {path: 'pessoa-juridica/cadastro', component: CadastroComponent},
  {path: 'pessoa-juridica/cadastro/:id', component: CadastroComponent},
  {path: 'pessoa-juridica/lista', component: ListaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaJuridicaRoutingModule { }
