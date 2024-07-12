import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServicoService } from '../service/servico.service';
import { Servico } from '../dados/servico-data';

@Component({
  selector: 'app-cadastrar-servico',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Cadastrar serviço</h1>
    <form [formGroup]="aplicaForm" (submit)="submeterForm()">
      <label for="input-nome">Nome</label><br>
      <input type="text" id="input-nome" formControlName="inputNome"><br>

      <label for="input-preco">Preço</label><br>
      <input type="text" id="input-preco" formControlName="inputPreco"><br>

      <button type="submit">Cadastrar</button>
    </form>
  `,
  styleUrl: './cadastrar-servico.component.css'
})
export class CadastrarServicoComponent {
  servicoService = inject(ServicoService);
  servico!: Servico;

  aplicaForm = new FormGroup({
    inputNome: new FormControl(''),
    inputPreco: new FormControl(0)
  });

  submeterForm(){
    const campos = this.aplicaForm.value;

    this.servico = {
      nome: campos.inputNome ?? '',
      preco: campos.inputPreco ?? 0
    };

    this.servicoService.cadastrarServico(this.servico);
  }
}
