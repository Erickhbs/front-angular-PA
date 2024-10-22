import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';

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

      <form [formGroup]="aplicaForm" (submit)="submeterForm()">
        <h3>Horários Disponíveis</h3>

        <div *ngFor="let d of diaList">
          <br>
          <div>
            <h6>{{ d.dia }}</h6>
          </div>
          <div class="input-horario" *ngFor="let h of d.horarios">
            <input type="radio"  id="id{{ d.id }}/{{ h.id }}" value="{{ d.id }}/{{ h.id }}" formControlName="inputDiaHorario">
            <label for="id{{ d.id }}/{{ h.id }}" class="btn btn-light">{{ h.hora }}</label>
          </div>
        </div><br>

        <label for="input-servico"><h3>Serviço</h3></label><br>
        <select id="input-servico" formControlName="inputServico" class="form-select" aria-label="Default select example">
          <option *ngFor="let s of servicoList" id="{{ s.id }}" value="{{ s.id }}">{{ s.nome }} - R$ {{ s.preco }}</option>
        </select><br>

        <button type="submit" class="btn btn-dark">Agendar</button>
      </form>
    </div>
  </main>
    
  `,
  styleUrl: './cadastrar-agendamento.component.css'
})
export class CadastrarAgendamentoComponent implements OnInit {
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

  idServico: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){
    this.diaService.getDiasHorariosAvailable().then(
      (dias: DiaSemana[]) => {
        this.diaList = dias;
      }
    );

    this.servicoService.getServicos().then(
      (servicos: Servico[]) => {
        this.servicoList = servicos;
      }
    );
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

    this.agendamentoService.cadastrarAgendamento(this.agendamento);

    this.router.navigate([''])
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idServico = params['id'];
    });

    this.aplicaForm.get('inputServico')!.setValue(this.idServico);
  }
}
