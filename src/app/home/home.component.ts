import { Component, inject } from '@angular/core';
import { ServicoService } from '../service/servico.service';
import { Servico } from '../dados/servico-data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Listagem de serviços</h1>
      <hr>
      <br>
      <div id="cards">
        <div *ngFor="let s of servicoList" class="card" style="width: 18rem;">
          <img src="{{ s.linkFoto }}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ s.nome }}</h5>
            <p class="card-text">R$ {{ s.preco }}</p>
            <button (click)="agendarServico(s.id!)" class="btn btn-dark">Agendar serviço</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  servicoService = inject(ServicoService);
  servicoList!: Servico[];

  constructor(private router: Router){
    this.servicoService.getServicos().then(
      (servicos: Servico[]) => {
        this.servicoList = servicos;
      }
    )
  }

  agendarServico(id: string){
    this.router.navigate(['cadastro-agendamento', id]);
  }
}
