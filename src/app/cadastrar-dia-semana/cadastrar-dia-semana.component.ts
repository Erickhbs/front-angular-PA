import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemana } from '../dados/dia-semana-data';
import { DiaSemanaService } from '../service/dia-semana.service';

@Component({
  selector: 'app-cadastrar-dia-semana',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <main>
    <div class="container" id="container" #containerRef>
      <h1>Cadastrar Dia</h1>
      <br>
      <div class="content">
        <div class="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ-_FhLTANeQzUmyZ_HVQnERXZixKf9qKaJg&s" alt="dia">
        </div>
        <div class="form-diaSemana dia">
          <form [formGroup]="aplicaForm" (ngSubmit)="submeterForm()" class="diasemana">
            <input type="text" formControlName="inputDia" name="nome" placeholder="Nome do dia">
            <br>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
      <br>
    </div>
    <div class="popup">
      <div class="popup-content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaO0oyzmK6d5Z8s41Z7-YATYbByzTKRFIvhw&s" alt="Success Icon" class="popup-icon">
        <p>Dia Cadastrado</p>
      </div>
    </div>
  </main>

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

  submeterForm() {
    const campos = this.aplicaForm.value;

    this.diaSemana = {
      dia: campos.inputDia ?? ''
    };

    this.diaSemanaService.cadastrarDia(this.diaSemana);
    this.aplicaForm.reset({ inputDia: '' });

    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.add('show-popup');
    setTimeout(() => {
      popup.classList.remove('show-popup');
    }, 1800);
  }
}

/*
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


<h1>Cadastro de dia da semana</h1>

    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <div class="form-floating">
        <input type="text" name="" id="input-dia" formControlName="inputDia" class="form-control" placeholder="Dia da semana">
        <label for="input-dia" class="form-label">Dia da semana</label>
      </div>
      <br>
      <button type="submit" class="btn btn-dark">Cadastrar</button>
    </form>



*/