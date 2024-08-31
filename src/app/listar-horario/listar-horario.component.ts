import { Component, inject } from '@angular/core';
import { HorarioService } from '../service/horario.service';
import { Horario } from '../dados/horario-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-horario',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Listagem de horários</h1>
      <hr>
      <br>

      <div *ngFor="let h of horarioList" class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary">{{ h.hora }}</button>
        <button type="button" class="btn btn-secondary" (click)="excluirHorario( h.id! )">Excluir</button>
      </div>
    </div>
  `,
  styleUrl: './listar-horario.component.css'
})

export class ListarHorarioComponent {
  horarioService = inject(HorarioService);
  horarioList!: Horario[];

  constructor(){
    this.horarioService.getHorarios().then(
      (horarios: Horario[]) => {
        this.horarioList = horarios;
      }
    )
  }

  async excluirHorario(id: string){
    await this.horarioService.deleteById(id);
  }
}