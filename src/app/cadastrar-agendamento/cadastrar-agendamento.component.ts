import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-agendamento',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Agendar atendimento</h1>
    <form>
    </form>
  `,
  styleUrl: './cadastrar-agendamento.component.css'
})
export class CadastrarAgendamentoComponent {


  aplicaForm = new FormGroup({

  })
}
