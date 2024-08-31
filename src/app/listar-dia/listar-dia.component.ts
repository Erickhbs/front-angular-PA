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
    <div class="container">
      <h1>Listagem de dias</h1>
      <hr>
      <br>

      <div *ngFor="let d of diaSemanaList" href="#">
        <div>
          <h5 class="mb-1">{{ d.dia }}</h5>
        </div>
        <ul class="mb-1" *ngIf="d.horarios != null">
          <li *ngFor="let h of d.horarios" class="btn btn-light">
            {{ h.hora }}
          </li>
        </ul>
        <div *ngIf="d.horarios == undefined" class="alert alert-secondary" role="alert">
          Você não disponibilizou horários neste dia ainda
        </div>

        <br>

        <button (click)="excluirDia( d.id! )" class="btn btn-outline-danger">Excluir dia</button>
      </div>

      <br>
      <span class="obs">Para disponibilizar horários, acesse: <a href="disponibilizar-horarios">disponibilizar horários</a>.</span>
    </div>
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
