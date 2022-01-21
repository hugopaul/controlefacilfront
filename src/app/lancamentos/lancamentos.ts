import { Recurso } from "../banco/recurso";
import { PessoaFisica } from "../pessoa-fisica/pessoaFisica";
import { PessoaJuridica } from "../pessoa-juridica/pessoaJuridica";

export class Lancamento{
    id! : number;
    descricao! : string;
    nfOuCodigo! : string;
    valor! : number;
    tipoLancamento! : number;
    recurso! :number ;
    data! :string;
    created! :string;
    desativado! : number;
    motivoDesativar!:string;
    pessoaFisica! :number;
    pessoaJuridica! :number;
    pf!: boolean;
    pj!:boolean;
}