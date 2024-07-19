import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  template: `
  <main>
    <div class="container" id="container" #containerRef>
      <div class="form-container sign-up">
        <form>
          <h1>Criar Conta</h1>
          <input type="text" placeholder="Nome">
          <input type="email" placeholder="Email">
          <input type="password" placeholder="senha">
          <button type="button">Registrar-se</button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form>
          <h1>Log-in</h1>
          <input type="email" placeholder="Email">
          <input type="password" placeholder="Senha">
          <button type="button">Entrar</button>
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

  constructor(private renderer: Renderer2) {}

  toggleContainer(isRegister: boolean) {
    if (isRegister) {
      this.renderer.addClass(this.container.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.container.nativeElement, 'active');
    }
  }
}