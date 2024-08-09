import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { CommonModule } from '@angular/common';
import { DiaSemana } from '../dados/dia-semana-data';
import { Horario } from '../dados/horario-data';

@Component({
  selector: 'app-disponibilizar-horarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h1>Disponibilizar horários</h1>

      <form [formGroup]="aplicaForm" (submit)="submeterForm()">
        <label for="dia-input">Dia da semana</label>
        <select name="" id="dia-input" formControlName="inputDia">
          <option *ngFor="let d of diaSemanaList" value="{{ d.id }}">{{ d.dia }}</option>
        </select>
        <br>
        <label for="horario-input">Horario</label>
        <select name="" id="horario-input" formControlName="inputHorario">
          <option *ngFor="let h of horarioList" value="{{ h.id }}">{{ h.hora }}</option>
        </select>
        <br>
        <button type="submit">Disponibilizar horário</button>
      </form>
    </div>
  `,
  styleUrl: './disponibilizar-horarios.component.css'
})
export class DisponibilizarHorariosComponent {
  diaSemanaService = inject(DiaSemanaService);
  horarioService = inject(HorarioService);

  diaSemanaList!: DiaSemana[];
  horarioList!: Horario[];

  diaForm!: DiaSemana;
  horarioForm!: Horario;

  aplicaForm = new FormGroup({
    inputDia: new FormControl(''),
    inputHorario: new FormControl('')
  });

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

  async submeterForm(){
    await this.inicializarObjetos();

    if(this.diaForm.horarios === undefined){
      this.diaForm.horarios = [];
      this.diaForm.horarios.push(this.horarioForm);
    }else{
      this.diaForm.horarios.push(this.horarioForm);
    }
    
    this.diaSemanaService.atualizarDia(this.diaForm);
    window.location.reload();
  }

  async inicializarObjetos(){
    const campos = this.aplicaForm.value;

    this.diaForm = await this.diaSemanaService.getDiaById(campos.inputDia as string);
    this.horarioForm = await this.horarioService.getHorarioById(campos.inputHorario as string);
  }
}
