import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {path: 'pessoa-fisica/cadastro', component: CadastroComponent},
  { path: 'pessoa-fisica/cadastro/:id', component: CadastroComponent},
  { path: 'pessoa-fisica/lista', component: ListaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaFisicaRoutingModule { }
