import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HorarioService } from '../service/horario.service';
import { Horario } from '../dados/horario-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-horario',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <main>
    <div class="container" id="container">
      <h1>Cadastrar Horário</h1>
      <div class="content">
        <img src="data:image/png;base64,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" class="image">
        <div class="time-picker">
          <form [formGroup]="aplicaForm" (submit)="submeterForm()">
            <input type="time" id="time-input" formControlName="inputHorario" step="60" required>
            <span class="validacao"></span>
            <button type="submit">Adicionar Horário</button>
          </form>
        </div>
      </div>
    </div>
  </main>
  `,
  styleUrls: ['./cadastrar-horario.component.css']
})
export class CadastrarHorarioComponent {
  horarioService = inject(HorarioService);
  router: Router;  

  aplicaForm = new FormGroup({
    inputHorario: new FormControl()
  });

  constructor(router: Router){
    this.router = router;
  }

  submeterForm() {
    const campoHorario = this.aplicaForm.value.inputHorario;

    if (this.validarHorario(campoHorario)) {
      const horario: Horario = { hora: campoHorario };
      this.horarioService.cadastrarHorario(horario);
    } else {
      alert('Por favor, escolha um horário entre 07:00 e 22:00.');
    }
    this.router.navigate(['listar-horario'])
  }

  validarHorario(horario: string): boolean {
    const [horas] = horario.split(':').map(Number);
    return horas >= 7 && horas <= 22;
  }
}

/*
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




 <select class="timer-piker--select">
          <option value="01">01</option>
        </select>
        :
        <select class="timer-piker--select">
          <option value="05">05</option>
        </select>





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

*/