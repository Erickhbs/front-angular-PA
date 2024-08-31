import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { CommonModule } from '@angular/common';
import { DiaSemana } from '../dados/dia-semana-data';
import { Horario } from '../dados/horario-data';
import { FormDiaHorarioComponent } from './form-dia-horario/form-dia-horario.component';

@Component({
  selector: 'app-disponibilizar-horarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormDiaHorarioComponent],
  template: `
    <div class="container">
      <br>
      <h1>Disponibilizar horários</h1>
      <hr>
      <br>

      <app-form-dia-horario [dias]="diaSemanaList" [horarios]="horarioList"></app-form-dia-horario>
    </div>
  `,
  styleUrl: './disponibilizar-horarios.component.css'
})
export class DisponibilizarHorariosComponent {
  diaSemanaService = inject(DiaSemanaService);
  horarioService = inject(HorarioService);

  diaSemanaList!: DiaSemana[];
  horarioList!: Horario[];

  constructor(){
    this.diaSemanaService.getDias().then(
      (dias: DiaSemana[]) => {
        this.diaSemanaList = dias;  
      }
    );

    this.horarioService.getHorarios().then(
      (horarios: Horario[]) => {
        this.horarioList = horarios;
      }
    );
  }
}
