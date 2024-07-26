import { Component, inject } from '@angular/core';
import { ServicoService } from '../service/servico.service';
import { Servico } from '../dados/servico-data';

@Component({
  selector: 'app-listar-servico',
  standalone: true,
  imports: [],
  template: `
    <h1>Listagem de serviços</h1>
    <ul class="list-group">
      <li *ngFor="let s of servicoList" class="list-group-item">
        {{ s.nome }} R$ {{ s.preco }}
      </li>
    </ul>
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
}
