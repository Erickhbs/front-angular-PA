import { Component, inject } from '@angular/core';
import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoResponse } from '../dados/agendamento-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-agendamento-cliente',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <div class="container">
      <h1>Listagem de agendamentos</h1>
      <br>

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
            <td>

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Cancelar agendamento
              </button>

              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      Tem certeza que quer cancelar o agendamento?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                      <button type="button" class="btn btn-danger" (click)="cancelar(a.id!)">Cancelar agendamento</button>
                    </div>
                  </div>
                </div>
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

  async cancelar(id: string){
    await this.agendamentoService.deleteById(id);
    window.location.reload();
  }
}
