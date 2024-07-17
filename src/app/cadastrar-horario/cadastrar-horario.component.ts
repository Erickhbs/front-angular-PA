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
      <div class="form-floating">
        <input type="number" id="input-hora" class="form-control" formControlName="inputHoras" placeholder="Hora">
        <label for="input-hora" class="form-label">Hora</label>
      </div>
      <br>
      <div class="form-floating">
        <input type="number" id="input-minuto" class="form-control" formControlName="inputMinutos" placeholder="Minuto">
        <label for="input-minuto" class="form-label">Minuto</label>
      </div>
      <br>
      <button type="submit" class="btn btn-dark">Cadastrar</button>
    </form>
  `,
  styleUrl: './cadastrar-horario.component.css'
})
export class CadastrarHorarioComponent {
  horarioService = inject(HorarioService);
  horario!: Horario; 
  
  aplicaForm = new FormGroup({
    inputHoras: new FormControl(),
    inputMinutos: new FormControl()
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
