import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { PessoaFisicaModule } from './pessoa-fisica/pessoa-fisica.module';
import { PessoaJuridicaModule } from './pessoa-juridica/pessoa-juridica.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http'
import { HomeComponent } from './home/home.component';
import { OrderModule } from 'ngx-order-pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BancoModule } from './banco/banco.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MenucadastrosComponent } from './menucadastros/menucadastros.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenucadastrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    PessoaFisicaModule,
    PessoaJuridicaModule,
    LancamentosModule,
    BancoModule,
     HttpClientModule,
     OrderModule,
     BrowserAnimationsModule,
     DashboardModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
