import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js'
import { ApiService } from 'src/app/api.service';
import { BarDash } from '../barDash';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements AfterViewInit {
  entrada: BarDash[] = [];
  saida: BarDash[] = [];
  transferencia: BarDash[] = [];
  meses: string[] = [];
  entradaBar: number[] = [];
  saidaBar: number[] = [];
  transfBar: number[] = [];
  somaValorEntrada : number = 0;

  constructor(
    private api: ApiService,
  ) { }
  @ViewChild('pieCanvas') private pieCanvas!: ElementRef;
  pieChart: any;

  ngAfterViewInit(): void {
    this.api.getSomaValorEntrada().subscribe(
      response => {
        this.somaValorEntrada = response
      }
      )
    
    this.api.getEntrada(2).subscribe(
      response => {
        this.entrada = response
        this.entradaValues();
      }
    )
    this.api.getEntrada(1).subscribe(
      response => {
        this.saida = response
        this.saidaValues();
      }
    )
    this.api.getEntrada(0).subscribe(
      response => {
        this.transferencia = response
        this.transferValues();
      }
    )

  }
  saidaValues() {
    for (let x of this.saida) {
      if (x.count == null) {
        this.saidaBar.push(0)
      } else {
        this.saidaBar.push(x.count);
      }
    }
  }
  transferValues() {
    for (let x of this.transferencia) {
      if (x.count == null) {
        this.transfBar.push(0)
      } else {
        this.transfBar.push(x.count);
      }
    }
    
    this.pieChartBrowser();
  }
  entradaValues() {
    for (let x of this.entrada) {
      this.meses.push(x.months);
    }
    for (let x of this.entrada) {
      if (x.count == null) {
        this.entradaBar.push(0)
      } else {
        this.entradaBar.push(x.count);
      }
    }
    
  }

  pieChartBrowser(): void {
    console.log(this.entradaBar, this.saidaBar, this.transfBar)
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: [{
          label: 'Saída',
          data: this.saidaBar ,
          borderWidth: 1
        },
        {
          label: 'Entrada',
          data: this.entradaBar,
          borderWidth: 1
        },
        {
          label: 'Transferência',
          data: this.transfBar,
          borderWidth: 1
        }]
      }
    });
  }
  mask() {
     
    var valor  = this.somaValorEntrada + '';
    valor = valor.replace(/[\D]+/g, '');
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return valor;
  }
}
