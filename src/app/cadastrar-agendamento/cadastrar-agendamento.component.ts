import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { ServicoService } from '../service/servico.service';
import { DiaSemana } from '../dados/dia-semana-data';
import { Horario } from '../dados/horario-data';
import { Servico } from '../dados/servico-data';

@Component({
  selector: 'app-cadastrar-agendamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Agendar atendimento</h1>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">

      <select name="" id="" formControlName="formDia">
        <option value=""></option>
      </select>

      <select name="" id="" formControlName="formHorario"></select>

      <select name="" id="" formControlName="formServico"></select>

      <button type="submit">Agendar</button>
    </form>
  `,
  styleUrl: './cadastrar-agendamento.component.css'
})
export class CadastrarAgendamentoComponent {
  diaService = inject(DiaSemanaService);
  horarioService = inject(HorarioService);
  servicoService = inject(ServicoService);

  dia!: DiaSemana[];
  horario!: Horario[];
  servico!: Servico[];
  
  aplicaForm = new FormGroup({

  });

  constructor(){
    this.diaService.getDias().then(
      (dia: DiaSemana[]) => {
        this.dia = dia;
      }
    )

    this.horarioService.getHorarios().then(
      (horario: Horario[]) => {
        this.horario = horario;
      }
    )

    this.servicoService.getServicos().then(
      (servico: Servico[]) => {
        this.servico = servico;
      }
    )
  }

  submeterForm(){

  }
}
