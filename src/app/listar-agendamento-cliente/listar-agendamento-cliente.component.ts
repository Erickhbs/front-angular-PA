import { Component, inject } from '@angular/core';
import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoResponse } from '../dados/agendamento-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-agendamento-cliente',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <h1>Listagem de agendamentos</h1>

    <table class="table">
    <thead>
      <tr>
        <th scope="col">Cliente</th>
        <th scope="col">Dia</th>
        <th scope="col">Horário</th>
        <th scope="col">Serviço</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let a of agendamentoList">
        <td>{{ a.usuario.name }}</td>
        <td>{{ a.dia.dia }}</td>
        <td>{{ a.horario.hora }}</td>
        <td>{{ a.servico.nome }}</td>
      </tr>
    </tbody>
  </table>
  `,
  styleUrl: './listar-agendamento-cliente.component.css'
})
export class ListarAgendamentoClienteComponent {
  agendamentoService = inject(AgendamentoService);
  agendamentoList!: AgendamentoResponse[];
  
  constructor(){
    this.agendamentoService.getAgendamentoByUsuario(
      localStorage.getItem('token') as string
    ).then(
      (agendamentos: AgendamentoResponse[]) => {
        this.agendamentoList = agendamentos;
      }
    );

    console.log(this.agendamentoList);
  }
}
