import { Component, inject } from '@angular/core';
import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoResponse } from '../dados/agendamento-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-agendamento',
  standalone: true,
  imports: [ CommonModule ],
  template: `
  <h1>Listagem de agendamentos</h1>
  <ul *ngFor="let a of agendamentoList" class="list-group">
    <li class="list-group-item">Agendamento {{ a.dia.dia }}  {{ a.horario.hora }}</li>
    <li class="list-group-item">{{ a.servico.nome }} R$ {{ a.servico.preco }}</li>
  </ul>
  `,
  styleUrl: './listar-agendamento.component.css'
})
export class ListarAgendamentoComponent {
  agendamentoService = inject(AgendamentoService);
  agendamentoList!: AgendamentoResponse[];
  
  constructor(){
    this.agendamentoService.getAgendamentos().then(
      (agendamentos: AgendamentoResponse[]) => {
        this.agendamentoList = agendamentos;
      }
    )
  }
}