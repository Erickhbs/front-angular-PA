import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { ServicoService } from '../service/servico.service';
import { DiaSemana } from '../dados/dia-semana-data';
import { Horario } from '../dados/horario-data';
import { Servico } from '../dados/servico-data';
import { Agendamento } from '../dados/agendamento-data';
import { AgendamentoService } from '../service/agendamento.service';

@Component({
  selector: 'app-cadastrar-agendamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Agendar atendimento</h1>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <label for="input-dia">Dia</label><br>
      <select id="input-dia" formControlName="inputDia">
        <option *ngFor="let d of diaList" value="{{ d.id }}">{{ d.dia }}</option>
      </select><br>

      <label for="input-horario">Horário</label><br>
      <select id="input-horario" formControlName="inputHorario">
        <option *ngFor="let h of horarioList" value="{{ h.id }}">{{ h.horas }}:{{ h.minutos }}</option>
      </select><br>

      <label for="input-servico">Serviço</label><br>
      <select id="input-servico" formControlName="inputServico">
        <option *ngFor="let s of servicoList" value="{{ s.id }}">{{ s.nome }}</option>
      </select><br>

      <button type="submit">Agendar</button>
    </form>
  `,
  styleUrl: './cadastrar-agendamento.component.css'
})
export class CadastrarAgendamentoComponent {
  agendamentoService = inject(AgendamentoService);
  diaService = inject(DiaSemanaService);
  horarioService = inject(HorarioService);
  servicoService = inject(ServicoService);

  diaList!: DiaSemana[];
  horarioList!: Horario[];
  servicoList!: Servico[];

  agendamento!: Agendamento;
  dia!: DiaSemana;
  horario!: Horario;
  servico!: Servico;
  
  aplicaForm = new FormGroup({
    inputDia: new FormControl(''),
    inputHorario: new FormControl(''),
    inputServico: new FormControl('')
  });

  constructor(){
    this.diaService.getDias().then(
      (dias: DiaSemana[]) => {
        this.diaList = dias;
      }
    )

    this.horarioService.getHorarios().then(
      (horarios: Horario[]) => {
        this.horarioList = horarios;
      }
    )

    this.servicoService.getServicos().then(
      (servicos: Servico[]) => {
        this.servicoList = servicos;
      }
    )
  }

  submeterForm(){
    const campos = this.aplicaForm.value;

    for(let d of this.diaList){
      if(d.id == campos.inputDia){
        this.dia = d;
        break;
      }
    }
    
    for(let h of this.horarioList){
      if(h.id == campos.inputHorario){
        this.horario = h;
        break;
      }
    }

    for(let s of this.servicoList){
      if(s.id == campos.inputServico){
        this.servico = s;
        break;
      }
    }

    this.agendamento = {
      dia: this.dia,
      horario: this.horario,
      servico: this.servico
    }

    this.agendamentoService.cadastrarAgendamento(this.agendamento);
  }
}
