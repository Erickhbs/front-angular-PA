import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Register } from '../dados/register-data';
import { LoginRequest, LoginResponse } from '../dados/login-data';
import { RegisterService } from '../service/register.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <main>
    <div class="container" id="container" #containerRef>
      <div class="form-container sign-up">
        <form [formGroup]="aplicaFormRegister"]>
          <h1>Criar Conta</h1>
          <input type="text" placeholder="Nome" formControlName="inputNome">
          <input type="email" placeholder="Email" formControlName="inputEmail">
          <input type="password" placeholder="senha" formControlName="inputSenha">
          <button type="submit">Registrar-se</button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form [formGroup]="aplicaFormLogin"]>
          <h1>Log-in</h1>
          <input type="email" placeholder="Email" formControlName="inputEmail">
          <input type="password" placeholder="Senha" formControlName="inputSenha">
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Bem Vindo de volta!</h1>
            <p>Entre para marcar seu horario!</p>
            <button class="hidden" id="login" (click)="toggleContainer(false)">Entrar</button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Olá, Amigo!</h1>
            <p>Registre-se para ter acesso à todos os serviços da nossa barbearia!</p>
            <button class="hidden" id="register" (click)="toggleContainer(true)">Registrar-se</button>
          </div>
        </div>
      </div>
    </div>
  </main>
  `,
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  @ViewChild('containerRef') container!: ElementRef;

  registryService = inject(RegisterService);
  loginService = inject(LoginService);

  registerRequest!: Register;
  loginRequest!: LoginRequest;
  loginResponse!: LoginResponse;

  aplicaFormRegister = new FormGroup({
    inputNome: new FormControl(''),
    inputEmail: new FormControl(''),
    inputSenha: new FormControl('')
  });

  aplicaFormLogin = new FormGroup({
    inputEmail: new FormControl(''),
    inputSenha: new FormControl('')
  });

  constructor(private renderer: Renderer2) {}

  register(){
    const campos = this.aplicaFormRegister.value;

    this.registerRequest = {
      name: campos.inputNome!,
      email: campos.inputEmail!,
      password: campos.inputSenha!,
      role: 'USER'
    };

    this.registryService.register(this.registerRequest);
  }

  async login(){
    const campos = this.aplicaFormLogin.value;

    this.loginRequest = {
      email: campos.inputEmail!,
      password: campos.inputSenha!
    }

    this.loginResponse = await this.loginService.logar(this.loginRequest);
    localStorage.setItem('token', this.loginResponse.token);
  }

  toggleContainer(isRegister: boolean) {
    if (isRegister) {
      this.renderer.addClass(this.container.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.container.nativeElement, 'active');
    }
  }
}