import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemana } from '../dados/dia-semana-data';
import { DiaSemanaService } from '../service/dia-semana.service';

@Component({
  selector: 'app-cadastrar-dia-semana',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Cadastro de dia da semana</h1>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <div class="form-floating">
        <input type="text" name="" id="input-dia" formControlName="inputDia" class="form-control" placeholder="Dia da semana">
        <label for="input-dia" class="form-label">Dia da semana</label>
      </div>
      <br>
      <button type="submit" class="btn btn-dark">Cadastrar</button>
    </form>
  `,
  styleUrl: './cadastrar-dia-semana.component.css'
})
export class CadastrarDiaSemanaComponent {
  diaSemanaService = inject(DiaSemanaService);
  diaSemana!: DiaSemana;

  aplicaForm = new FormGroup({
    inputDia: new FormControl(''),
    inputDisponivel: new FormControl(),
  });

  constructor(){ }

  submeterForm(){
    const campos = this.aplicaForm.value;

    console.log(campos.inputDisponivel)

    this.diaSemana = {
      dia: campos.inputDia ?? '',
    };

    this.diaSemanaService.cadastrarDia(this.diaSemana);
  }
}
