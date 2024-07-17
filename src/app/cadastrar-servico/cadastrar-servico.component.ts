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
      <div class="form-floating">
        <input type="text" id="input-nome" class="form-control" formControlName="inputNome" placeholder="Nome">
        <label for="input-nome" class="form-label">Nome</label>
      </div>
      <br>
      <div class="form-floating">
        <input type="text" id="input-preco" class="form-control" formControlName="inputPreco" placeholder="Preço">
        <label for="input-preco" class="form-label">Preço</label>
      </div>
      <br>
      <button type="submit" class="btn btn-dark">Cadastrar</button>
    </form>
  `,
  styleUrl: './cadastrar-servico.component.css'
})
export class CadastrarServicoComponent {
  servicoService = inject(ServicoService);
  servico!: Servico;

  aplicaForm = new FormGroup({
    inputNome: new FormControl(''),
    inputPreco: new FormControl()
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
