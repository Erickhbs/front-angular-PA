import { Component, inject } from '@angular/core';
import { HorarioService } from '../service/horario.service';
import { Horario } from '../dados/horario-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-horario',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Listagem de horários</h1>
    <ul class="list-group">
      <li *ngFor="let h of horarioList" class="list-group-item">{{ h.hora }}</li>
    </ul>
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
}