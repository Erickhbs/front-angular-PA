import { Component, inject, input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { ServicoService } from '../service/servico.service';
import { DiaSemana } from '../dados/dia-semana-data';
import { Horario } from '../dados/horario-data';
import { Servico } from '../dados/servico-data';
import { AgendamentoRequest } from '../dados/agendamento-data';
import { AgendamentoService } from '../service/agendamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-agendamento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <main>
    <div class="container">
      <h1>Agendar atendimento</h1>
      <form [formGroup]="aplicaForm" (submit)="submeterForm()">
        <label for="input-dia">Dia</label><br>
        <select id="input-dia" formControlName="inputDia" class="form-select" aria-label="Default select example" (change)="carregarHorariosDisponiveis()">
          <option *ngFor="let d of diaList" value="{{ d.id }}">{{ d.dia }}</option>
        </select><br>

        <label *ngIf="diaSelecionado" for="input-horario">Horário</label><br>
        <select *ngIf="diaSelecionado" id="input-horario" formControlName="inputHorario" class="form-select" aria-label="Default select example">
          <option *ngFor="let h of horarioList" value="{{ h.id }}">{{ h.hora }}</option>
        </select><br>

        <label for="input-servico">Serviço</label><br>
        <select id="input-servico" formControlName="inputServico" class="form-select" aria-label="Default select example">
          <option *ngFor="let s of servicoList" value="{{ s.id }}">{{ s.nome }} - R$ {{ s.preco }}</option>
        </select><br>

        <button type="submit" class="btn btn-dark">Agendar</button>
      </form>
    </div>
  </main>
    
  `,
  styleUrl: './cadastrar-agendamento.component.css'
})
export class CadastrarAgendamentoComponent {
  agendamentoService = inject(AgendamentoService);
  diaService = inject(DiaSemanaService);
  horarioService = inject(HorarioService);
  servicoService = inject(ServicoService);
  diaSelecionado = false;

  diaList!: DiaSemana[];
  horarioList!: Horario[];
  servicoList!: Servico[];

  agendamento!: AgendamentoRequest;
  
  aplicaForm = new FormGroup({
    inputDia: new FormControl(''),
    inputHorario: new FormControl(''),
    inputServico: new FormControl('')
  });

  router: Router;

  constructor(router: Router){
    this.router = router;

    this.diaService.getDiasHorariosAvailable().then(
      (dias: DiaSemana[]) => {
        this.diaList = dias;
      }
    )

    this.servicoService.getServicos().then(
      (servicos: Servico[]) => {
        this.servicoList = servicos;
      }
    )
  }

  submeterForm(){
    const token = localStorage.getItem('token');
    const campos = this.aplicaForm.value;

    this.agendamento = {
      dia: campos.inputDia!,
      horario: campos.inputHorario!,
      servico: campos.inputServico!,
      usuario: token as string
    };

    this.agendamentoService.cadastrarAgendamento(this.agendamento);

    this.router.navigate([''])
  }

  carregarHorariosDisponiveis(){
    let campos = this.aplicaForm.value;
    let [horariosDoDia] = this.diaList.filter(
      diaList => diaList.id == campos.inputDia
    );

    this.horarioList = horariosDoDia.horarios!;

    this.diaSelecionado = true;
  }
}
