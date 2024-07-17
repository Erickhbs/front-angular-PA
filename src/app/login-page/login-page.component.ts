import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  template: `
    <main>
      <section class="formSection">
        <img src="https://www.shopping-guararapes.com/files/news/17098153577762-noticiasitebarbearia2.jpg"/>
        <h2></h2>
        <button>Entrar</button>
        <div>
          <span>cadastrar</span>
        </div>
        <button>Registrar-se</button>
      </section>
    </main>
  `,

  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
