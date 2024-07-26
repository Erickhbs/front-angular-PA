import { Component, inject } from '@angular/core';
import { DiaSemanaService } from '../service/dia-semana.service';
import { DiaSemana } from '../dados/dia-semana-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-dia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Listagem de dias</h1>
    <div *ngFor="let d of diaSemanaList">
      <ul class="list-group">
        <li class="list-group-item">
          Horários da {{ d.dia }}
        </li>
        <ul>
          <li *ngFor="let h of d.horarios">
            {{ h.hora }}
          </li>
        </ul>
      </ul>
      <br><br>
    </div>
  `,
  styleUrl: './listar-dia.component.css'
})
export class ListarDiaComponent {
  diaSemanaService = inject(DiaSemanaService);
  diaSemanaList!: DiaSemana[];

  constructor(){
    this.diaSemanaService.getDias().then(
      (dias: DiaSemana[]) => {
        this.diaSemanaList = dias;
      }
    )
  }
}
