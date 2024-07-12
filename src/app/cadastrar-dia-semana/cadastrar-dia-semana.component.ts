import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemanaRequest } from '../dados/dia-semana-data';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { HorarioRequest, HorarioResponse } from '../dados/horario-data';

@Component({
  selector: 'app-cadastrar-dia-semana',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Cadastro de dia da semana</h1>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <label for="input-dia">Dia da semana</label><br>
      <input type="text" name="" id="input-dia" formControlName="inputDia"><br>

      <button type="submit">Cadastrar</button>
    </form>
  `,
  styleUrl: './cadastrar-dia-semana.component.css'
})
export class CadastrarDiaSemanaComponent {
  diaSemanaService = inject(DiaSemanaService);
  diaSemanaRequest!: DiaSemanaRequest;

  aplicaForm = new FormGroup({
    inputDia: new FormControl(''),
    inputDisponivel: new FormControl(),
  });

  constructor(){ }

  submeterForm(){
    const campos = this.aplicaForm.value;

    console.log(campos.inputDisponivel)

    this.diaSemanaRequest = {
      dia: campos.inputDia ?? '',
    };

    this.diaSemanaService.cadastrarDia(this.diaSemanaRequest);
  }
}
