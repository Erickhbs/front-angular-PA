import { Component, inject } from '@angular/core';
import { ServicoService } from '../service/servico.service';
import { Servico } from '../dados/servico-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-servico',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Listagem de serviços</h1>
    <div *ngFor="let s of servicoList" class="card" style="width: 18rem;">
      <img src="{{ s.linkFoto }}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">{{ s.nome }}</h5>
        <p class="card-text">R$ {{ s.preco }}</p>
        <a (click)="removerServico( s.id! )" href="#" class="btn btn-dark">Excluir</a>
      </div>
    </div>
  `,
  styleUrl: './listar-servico.component.css'
})
export class ListarServicoComponent {
  servicoService = inject(ServicoService);
  servicoList!: Servico[];

  constructor(){
    this.servicoService.getServicos().then(
      (servicos: Servico[]) => {
        this.servicoList = servicos;
      }
    )
  }

  removerServico(id: string){
    this.servicoService.deleteById(id);
  }
}
