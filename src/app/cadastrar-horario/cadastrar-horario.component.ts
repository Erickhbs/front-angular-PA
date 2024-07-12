import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HorarioService } from '../service/horario.service';
import { Horario } from '../dados/horario-data';

@Component({
  selector: 'app-cadastrar-horario',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Cadastro de Horário</h1>
    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <table>
        <tr>
          <td>
            <label for="input-hora">Hora</label><br>
            <input type="number" id="input-hora" formControlName="inputHoras" ><br>
          </td>
          <td>
            <label for="input-minuto">Minuto</label><br>
            <input type="number" id="input-minuto" formControlName="inputMinutos"><br>
          </td>
        </tr>
      </table>
      <button type="submit">Cadastrar</button>
    </form>
  `,
  styleUrl: './cadastrar-horario.component.css'
})
export class CadastrarHorarioComponent {
  horarioService = inject(HorarioService);
  horario!: Horario; 
  
  aplicaForm = new FormGroup({
    inputHoras: new FormControl(0),
    inputMinutos: new FormControl(0)
  });

  submeterForm(){
    const campos = this.aplicaForm.value;

    this.horario = {
      horas: campos.inputHoras as number,
      minutos: campos.inputMinutos as number,
    }

    this.horarioService.cadastrarHorario(this.horario)
  }
}
