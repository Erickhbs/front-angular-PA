import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
      <hr>
      <br>

      <h2>Horários Disponíveis</h2>
      <form [formGroup]="aplicaForm" (submit)="submeterForm()">
        <div *ngFor="let d of diaList">
          <br>
          <div>
            <h5>{{ d.dia }}</h5>
          </div>
          <div class="input-horario" *ngFor="let h of d.horarios">
            <input type="radio"  id="id{{ d.id }}/{{ h.id }}" value="{{ d.id }}/{{ h.id }}" formControlName="inputDiaHorario">
            <label for="id{{ d.id }}/{{ h.id }}" class="btn btn-light">{{ h.hora }}</label>
          </div>
        </div>

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
  servicoList!: Servico[];

  agendamento!: AgendamentoRequest;
  
  aplicaForm = new FormGroup({
    inputDiaHorario: new FormControl(''),
    inputServico: new FormControl('')
  });

  router: Router;

  constructor(router: Router, private cdr: ChangeDetectorRef){
    this.router = router;

    this.diaService.getDiasHorariosAvailable().then(
      (dias: DiaSemana[]) => {
        this.diaList = dias;
        console.log(dias);
      }
    )

    this.servicoService.getServicos().then(
      (servicos: Servico[]) => {
        this.servicoList = servicos;
        this.cdr.detectChanges(); 
      }
    )
  }

  submeterForm(){
    const token = localStorage.getItem('token');
    const campos = this.aplicaForm.value;
    let [inputDia, inputHorario] = campos.inputDiaHorario!.split('/');

    this.agendamento = {
      dia: inputDia,
      horario: inputHorario,
      servico: campos.inputServico!,
      usuario: token as string
    };

    console.log(this.agendamento);
    this.agendamentoService.cadastrarAgendamento(this.agendamento);

    this.router.navigate([''])
  }

  // carregarHorariosDisponiveis(){
  //   let campos = this.aplicaForm.value;
  //   let [horariosDoDia] = this.diaList.filter(
  //     diaList => diaList.id == campos.inputDia
  //   );

  //   this.horarioList = horariosDoDia.horarios!;

  //   this.diaSelecionado = true;
  // }
}
