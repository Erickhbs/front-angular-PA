import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServicoService } from '../service/servico.service';
import { Servico } from '../dados/servico-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-servico',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <main>
    <div class="container" id="container" #containerRef>
      <h1>Cadastrar Serviço</h1>
      <br>
      <div class="content">
        <div class="image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzncBmx8lePwoAmO6IPfGtBRpR5aSPIKuZxQ&s" alt="">
        </div>
        <div class="form-servico servico">
          <form [formGroup]="aplicaForm" (ngSubmit)="submeterForm()" class="dadosServico">
            <input type="text" formControlName="inputNome" name="nome" placeholder="Nome do Serviço">
            <input type="number" formControlName="inputPreco" name="preco" placeholder="Preço do Serviço" min="1" step="any">
            <input type="url" formControlName="inputFoto" name="foto" placeholder="Link de imagem">
            <br>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
    <div class="popup">
      <div class="popup-content">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaO0oyzmK6d5Z8s41Z7-YATYbByzTKRFIvhw&s" alt="Success Icon" class="popup-icon">
        <p>Serviço cadastrado</p>
      </div>
    </div>
  </main>

  `,
  styleUrl: './cadastrar-servico.component.css'
})

export class CadastrarServicoComponent {
  servicoService = inject(ServicoService);
  servico!: Servico;
  router: Router;

  aplicaForm = new FormGroup({
    inputNome: new FormControl(''),
    inputPreco: new FormControl(),
    inputFoto: new FormControl('')
  });

  constructor(router: Router){
    this.router = router;
  }

  submeterForm() {
    const campos = this.aplicaForm.value;

    this.servico = {
      nome: campos.inputNome ?? '',
      preco: campos.inputPreco ?? 0,
      linkFoto: campos.inputFoto ?? ''
    };

    this.servicoService.cadastrarServico(this.servico);
    this.aplicaForm.reset({ inputNome: '', inputPreco: 0 });
    
    const popup = document.querySelector('.popup') as HTMLElement;
    popup.classList.add('show-popup');
    setTimeout(() => {
      popup.classList.remove('show-popup');
    }, 1800);

    this.router.navigate(['listar-servico']);
  }
}

/*
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



*/