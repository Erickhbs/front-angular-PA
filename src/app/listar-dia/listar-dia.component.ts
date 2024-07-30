import { Component, inject } from '@angular/core';
import { DiaSemanaService } from '../service/dia-semana.service';
import { DiaSemana } from '../dados/dia-semana-data';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Horario } from '../dados/horario-data';
import { HorarioService } from '../service/horario.service';

@Component({
  selector: 'app-listar-dia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Listagem de dias</h1>

    <a *ngFor="let d of diaSemanaList" href="#" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ d.dia }}</h5>
      </div>
      <ul class="mb-1">
        <li *ngFor="let h of d.horarios" class="btn btn-light">
          {{ h.hora }}
        </li>
      </ul>
      <button (click)="excluirDia( d.id! )" class="btn btn-outline-danger">Excluir</button>
    </a>

    <h1>Disponibilizar horários</h1>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <label for="dia-input">Dia da semana</label>
      <select name="" id="dia-input" formControlName="inputDia">
        <option *ngFor="let d of diaSemanaList" value="{{ d.id }}">{{ d.dia }}</option>
      </select>
      
      <label for="horario-input">Horario</label>
      <select name="" id="horario-input" formControlName="inputHorario">
        <option *ngFor="let h of horarioList" value="{{ h.id }}">{{ h.hora }}</option>
      </select>
      <button type="submit">Disponibilizar horário</button>
    </form>
  `,
  styleUrl: './listar-dia.component.css'
})
export class ListarDiaComponent {
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

  async excluirDia(id: string){
    for(let d of this.diaSemanaList){
      if(d.id === id){
        d.horarios = [];
        await this.diaSemanaService.atualizarDia(d);
      }
    }
    await this.diaSemanaService.deleteById(id);
    window.location.reload();
  }
}
