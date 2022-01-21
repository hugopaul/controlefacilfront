import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from '../lancamentos/lista/lista.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const routes: Routes = [
  {path: 'lancamentos/cadastro', component: CadastroComponent},
  { path: 'lancamentos/cadastro/:id', component: CadastroComponent},
  { path: 'lancamentos/lista', component: ListaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
