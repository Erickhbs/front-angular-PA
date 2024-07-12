import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DiaSemanaService } from '../service/dia-semana.service';
import { HorarioService } from '../service/horario.service';
import { ServicoService } from '../service/servico.service';

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
  diaService = inject(DiaSemanaService);
  horarioService = inject(HorarioService);
  servicoService = inject(ServicoService);

  //diaRequest = inject()

  aplicaForm = new FormGroup({

  })
}
