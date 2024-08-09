import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../dados/login-data';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly url = 'http://localhost:8080/auth/login';
  loginRequest!: LoginRequest;
  loginResponse!: LoginResponse;
  
  constructor() { }

  async logar(loginReq: LoginRequest): Promise<LoginResponse>{
    const token = localStorage.getItem('token');

    const data = await fetch(this.url,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(loginReq)
    }).then(
      (response) => {
        if(!response.ok){
          if(response.status >= 500){
            alert("Email não localizado");
          }

          if(response.status < 500 && response.status >= 400){
            alert("Senha incorreta")
          }
          
          throw new Error('Erro ao logar!');
        }

        return response;
      }
    );

    alert("Login efetuado com sucesso")

    return await data.json();
  }
}
