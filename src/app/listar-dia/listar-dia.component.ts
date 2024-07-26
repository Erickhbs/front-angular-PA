import { Component, inject } from '@angular/core';
import { DiaSemanaService } from '../service/dia-semana.service';
import { DiaSemana } from '../dados/dia-semana-data';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Horario } from '../dados/horario-data';
import { HorarioService } from '../service/horario.service';

@Component({
  selector: 'app-listar-dia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h1>Listagem de dias</h1>

    <div *ngFor="let d of diaSemanaList">
      <ul class="list-group">
        <li class="list-group-item">
          Horários da {{ d.dia }} <button (click)="excluirDia( d.id! )">Excluir</button>
        </li>
        <ul>
          <li *ngFor="let h of d.horarios">
            {{ h.hora }}
          </li>
        </ul>
      </ul>
    </div>

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
        console.log(dias);
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
  }

  async inicializarObjetos(){
    const campos = this.aplicaForm.value;

    this.diaForm = await this.diaSemanaService.getDiaById(campos.inputDia as string);
    this.horarioForm = await this.horarioService.getHorarioById(campos.inputHorario as string);
  }

  async excluirDia(id: string){
    let obj;
    for(let d of this.diaSemanaList){
      if(d.id === id){
        d.horarios = [];
        obj = d;
        await this.diaSemanaService.atualizarDia(obj);
      }
    }
    await this.diaSemanaService.deleteById(id);
  }
}
