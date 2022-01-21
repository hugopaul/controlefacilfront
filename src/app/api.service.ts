import { Injectable } from '@angular/core';
import { PessoaFisica } from './pessoa-fisica/pessoaFisica';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PessoaJuridica } from './pessoa-juridica/pessoaJuridica';
import { Lancamento } from './lancamentos/lancamentos';
import { Recurso } from './banco/recurso';
import { BarDash } from './dashboard/barDash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  url: string = 'http://localhost:8080'

  salvarPessoaFisica(pessoaFisica: PessoaFisica): Observable<PessoaFisica> {
    return this.http.post<PessoaFisica>(this.url + '/pessoa-fisica', pessoaFisica)
  }
  salvarPessoaJuridica(pessoaJuridica: PessoaJuridica): Observable<PessoaJuridica> {
    return this.http.post<PessoaJuridica>(this.url + '/pessoa-juridica', pessoaJuridica)
  }
  salvarLancamento(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<Lancamento>(this.url + '/lancamento', lancamento)
  }
  salvarRecurso(recurso: Recurso): Observable<Recurso> {
    return this.http.post<Recurso>(this.url + '/recurso', recurso)
  }


  getPessoaFisica(): Observable<PessoaFisica[]> {
    return this.http.get<PessoaFisica[]>(this.url + '/pessoa-fisica/all');
  }
  getPessoaJuridica(): Observable<PessoaJuridica[]> {
    return this.http.get<PessoaJuridica[]>(this.url + '/pessoa-juridica/all');
  }
  getLancamento(): Observable<Lancamento[]> {
    return this.http.get<Lancamento[]>(this.url + '/lancamento/all');
  }
  getRecurso(): Observable<Recurso[]> {
    return this.http.get<Recurso[]>(this.url + '/recurso/all');
  }

  putPessoaFisica(pessoaFisica: PessoaFisica): Observable<any> {
    return this.http.put<PessoaFisica>(`http://localhost:8080/pessoa-fisica/${pessoaFisica.id}`, pessoaFisica);
  }
  putPessoaJuridica(pessoaJuridica: PessoaJuridica): Observable<any> {
    return this.http.put<PessoaJuridica>(`http://localhost:8080/pessoa-juridica/${pessoaJuridica.id}`, pessoaJuridica);
  }
  putLancamento(lancamento: Lancamento): Observable<any> {
    return this.http.put<Lancamento>(`http://localhost:8080/lancamento/${lancamento.id}`, lancamento);
  }
  putRecurso(recurso: Recurso): Observable<any> {
    return this.http.put<Recurso>(`http://localhost:8080/lancamento/${recurso.id}`, recurso);
  }

  getPessoaFisicaByName(name: string): Observable<any> {
    return this.http.post<string>(`${this.url}/pessoa-fisica/buscar-string`, name);
  }
  getPessoaJuridocaByName(razaoSocial: string): Observable<any> {
    return this.http.post<string>(`${this.url}/pessoa-juridica/buscar-string`, razaoSocial);
  }
  getRecursoByName(nome: string): Observable<any> {
    return this.http.post<string>(`${this.url}/recurso/buscar-string`, nome);
  }



  getPessoaFisicaById(id: number): Observable<PessoaFisica> {
    return this.http.get<any>(`${this.url}/pessoa-fisica/${id}`);
  }
  getPessoaJuridicaById(id: number): Observable<PessoaJuridica> {
    return this.http.get<any>(`${this.url}/pessoa-juridica/${id}`);
  }
  getLancamentoById(id: number): Observable<Lancamento> {
    return this.http.get<any>(`${this.url}/lancamento/${id}`);
  }
  getRecursoById(id: number): Observable<Recurso> {
    return this.http.get<any>(`${this.url}/recurso/${id}`);
  }

  desativaPessoaFisicaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/pessoa-fisica/desativar/${id}`);
  }
  desativaPessoaJuridicaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/pessoa-juridica/desativar/${id}`);
  }
  desativaLancamentoById(id: number, lancamento: Lancamento): Observable<any> {
    return this.http.put<string>(`${this.url}/lancamento/${id}`, lancamento);
  }
  desativaRecursoById(id: number,): Observable<any> {
    return this.http.get<any>(`${this.url}/recurso/desativar/${id}`);
  }


  ativaPessoaFisicaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/pessoa-fisica/ativa/${id}`);
  }
  ativaPessoaJuridicaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/pessoa-juridica/ativa/${id}`);
  }
  ativaLancamentoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/lancamento/ativa/${id}`);
  }
  ativaRecursoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/recurso/ativa/${id}`);
  }

  getEntrada( x : number): Observable<BarDash[]> {
    return this.http.get<BarDash[]>(`${this.url}/lancamento/dashboards/line/entrada/${x}`)
  }
  getSomaValorEntrada(): Observable<number> {
    return this.http.get<number>(`${this.url}/lancamento/dashboards/somavalorvntrada`)
  }
}
