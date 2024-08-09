import { Component, inject } from '@angular/core';
import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoResponse } from '../dados/agendamento-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-agendamento',
  standalone: true,
  imports: [ CommonModule ],
  template: `
  <div class="container">
    <h1>Agenda</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Cliente</th>
          <th scope="col">Dia</th>
          <th scope="col">Horário</th>
          <th scope="col">Serviço</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let a of agendamentoList">
          <td>{{ a.usuario.name }}</td>
          <td>{{ a.dia.dia }}</td>
          <td>{{ a.horario.hora }}</td>
          <td>{{ a.servico.nome }}</td>
          <td><button type="button" class="btn btn-danger" (click)="cancelar(a.id!)">Remover agendamento</button></td>
        </tr>
      </tbody>
    </table>
  </div>
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

  async cancelar(id: string){
    if(window.confirm("Quer mesmo cancelar o agendamento?")){
      await this.agendamentoService.deleteById(id);
      window.location.reload();
    }
  }
}